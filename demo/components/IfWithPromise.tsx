import * as React from 'react';
import { Else, Fallback, If, Then } from '../../dist';

interface ExtendedPromise extends Promise<unknown> {
  _id?: number;
  fulfilled?: boolean;
}

interface Props {
  resolutionReturnValue: unknown;
  rejectionReturnValue: unknown;
  delay: number;
}

const IfWithPromise: React.FC<Props> = ({ resolutionReturnValue, rejectionReturnValue, delay }) => {
  const [currentPromise, setCurrentPromise] = React.useState<null | ExtendedPromise>(null);
  const currentPromiseId = React.useRef<number>(1);
  const [keepAlive, setKeepAlive] = React.useState<boolean>(false);
  const [createdPromises, setCreatedPromises] = React.useState<Array<ExtendedPromise>>([]);

  const pendingPromises = React.useMemo((): ExtendedPromise[] => createdPromises.filter((p) => !p.fulfilled), [createdPromises]);
  const fulfilledPromises = React.useMemo((): ExtendedPromise[] => createdPromises.filter((p) => p.fulfilled), [createdPromises]);

  const createPromise = (shouldResolve: boolean) => {
    const newPromise: ExtendedPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        shouldResolve ? resolve(resolutionReturnValue) : reject(rejectionReturnValue);
      }, delay * 1000);
    });
    newPromise._id = currentPromiseId.current;
    currentPromiseId.current++;
    newPromise.fulfilled = false;

    setCurrentPromise(newPromise);
    setCreatedPromises([...createdPromises, newPromise]);
  };

  const markAsFulfilled = React.useCallback(
    (fulfilledCancellablePromises: Array<any>) => {
      setCreatedPromises(
        createdPromises.map((createdPromise) => {
          const isInHistoryOfFulfilled = fulfilledCancellablePromises.find(
            (cancellablePromise) => cancellablePromise.promise._id === createdPromise._id
          );
          if (Boolean(isInHistoryOfFulfilled)) {
            createdPromise.fulfilled = true;
          }
          return createdPromise;
        })
      );
    },
    [createdPromises]
  );

  const ifBlock = React.useMemo(
    (): React.ReactNode => (
      <If condition={currentPromise} keepAlive={keepAlive}>
        <Then>
          {(data: any, history: Array<any>) => {
            // FOR DEMO PURPOSE ONLY; DO NOT SET STATE INSIDE RENDER OTHERWISE
            setTimeout(() => markAsFulfilled(history));

            return (
              <p>
                This <span className="font-bold">{'<Then />'}</span> block shows up once promise is resolved; Return value of promise resolution:
                <span className="font-bold">{data || toString.call(data)}</span>
              </p>
            );
          }}
        </Then>
        <Else>
          {(error: any, history: Array<any>) => {
            setTimeout(() => markAsFulfilled(history));
            return (
              <p>
                This <span className="font-bold">{'<Else />'}</span> block shows up only if promise is rejected; Error thrown by promise rejection:
                <span className="font-bold">{error || toString.call(error)}</span>
              </p>
            );
          }}
        </Else>
        <Fallback>
          <p>
            <span className="inline-spinner"></span> This is the <span className="font-bold">{'<Fallback />'}</span> block; waiting for the promise to
            be fulfilled (after {delay} seconds) ...
          </p>
        </Fallback>
      </If>
    ),
    [currentPromise, delay, keepAlive, markAsFulfilled]
  );

  return (
    <div id="if-then">
      {currentPromise && ifBlock}
      <nav>
        <div className="flex justify-start">
          <button onClick={() => createPromise(true)} className="btn btn-accent mr-2">
            Create promise and resolve
          </button>
          <button onClick={() => createPromise(false)} className="btn btn-secondary">
            Create promise and reject
          </button>
        </div>
        <div className="text-center text-sm">
          <div className="form-control items-start">
            <label className="cursor-pointer label">
              <span className="label-text mr-4">keepAlive:</span>
              <input type="checkbox" checked={keepAlive} onChange={() => setKeepAlive(!keepAlive)} id="keep-alive" className="checkbox"></input>
            </label>
          </div>

          {currentPromise && (
            <div className="flex flex-wrap flex-col justify-start items-start content-start">
              <p className="my-2 mx-1">
                Pending promises: <span className="font-bold">{pendingPromises.length}</span>
              </p>
              <p className="my-2 mx-1">
                Fulfilled promises: <span className="font-bold">{fulfilledPromises.length}</span>
              </p>
              <p className="my-2 mx-1">
                Total: <span className="font-bold">{createdPromises.length}</span>
              </p>
            </div>
          )}
          {keepAlive && (
            <div className="flex flex-wrap flex-col justify-start items-start content-start">
              <p className="my-2 mx-1">
                Alternate clicks on each button to observe the effect of the <span className="font-bold">keepAlive</span> prop
              </p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default IfWithPromise;
