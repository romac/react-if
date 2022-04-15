$latestTag = $(git describe --tags $(git rev-list --tags --max-count=1))

yarn changelog

git add CHANGELOG.md
git commit --amend --no-edit --no-verify

$latestCommit = $(git rev-list HEAD | head -1)

git tag -d $latestTag
git tag "$latestTag" $latestCommit