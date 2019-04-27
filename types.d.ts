declare module 'react-if'{
  interface IfOptions{
    condition: (() => boolean) | boolean;
  }

  /**
   * If condition evaluates to true, renders the <Then /> block will be rendered, otherwise renders the <Else /> block. Either block may be omitted.
   *
   * This component can contain any number of <Then /> or <Else /> blocks, but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.
   */
  export class If extends React.Component<IfOptions, any>{}

  /** Must contain only a single child, which it renders as-is. Should not be used outside of an <If /> block. */
  export class Then extends React.Component {}

  /** Must only contain a single child, which it renders as-is. Should not be used outside of an <If /> block. */
  export class Else extends React.Component {}

  /** A shorthand for <If condition={...}><Then>...</Then></If>. The same rules apply to the child elements as with using the Then block. */
  export class When extends React.Component<IfOptions, any>{}

  /** A shorthand for <If condition={...}><Else>...</Else></If>. The same rules apply to the child elements as with using the Else block. */
  export class Unless extends React.Component<IfOptions, any>{}
}
