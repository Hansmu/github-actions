# Github Actions

## Basic building blocks
Workflows are what you add to your repository. Those workflows contain one or more jobs.
Those jobs contain one or more steps that will be executed in the order that they are
specified.

![Basic workflow buildup](images/basic-workflow-buildup.png)

![Workflow-jobs-steps](images/workflow-jobs-steps.png)

In public repositories, you can use GitHub Actions for free. For private 
repositories, only a certain amount of monthly usage is available for free - extra usage 
on top must be paid.

To have multiline shell  commands, then you can precede the commands with a pipe on the
first line.
```yml
run: |
    echo "First output"
    echo "Second output"
```

Github Actions can have a ton of triggers.
![Action Triggers](images/action-triggers.png)

An action in the context of Github Actions is a custom application that performs a (typically
complex) frequently repeated task. An alternative to that is using the run key that execute
(typically simple) shell commands that are defined by you.

When you view actions in the marketplace, then a checkmark with "Verified creator" can give
you extra confidence that the action isn't doing anything malicious as it has been verified.

Events can have filters and activity types
![Activity types and filters](images/activity-types-filters.png)

Pull requests from forked repositories do not automatically run CI actions on first commit.
This is to avoid spam from untrusted contributors.

Workflows can be cancelled and skipped. You can add a certain string to a commit message
to skip execution. E.g. `[skip ci]`
![Cancelling and skipping workflows](images/cancelling-and-skipping.png)

Jobs can spit out artifacts, and they can be used either manually or automatically.
![Artifacts](images/artifacts.png)

`continue-on-error: true` can be used to have an action finish with a success, even if a failure
happens.

Multiple steps can be grouped into a single custom action.

You can create a separate repository for custom actions or put them in an existing repository.
![Types of actions](images/action-types.png)

There are some security concerns to consider.
![Some security concerns](images/some-security-issues.png)

In order to sanitize against injection, then put a user controlled input in your script through
a variable controlled by GitHub, for example env. So something like
```yml
env:
  TITLE: ${{ github.event.issue.title }} 
```

![Action security levels](action-security-levels.png)

You can control permissions that an action gets by adding a permissions tag on the job or 
workflow level.
```yml
permissions:
  issues: write
```

If we're sending requests to the GitHub Actions API, then we need to add an authorization
token. We also have access to a GitHub Actions Authorization token inside our actions. An
example is in the [permissions.yml](./.github/workflows/permissions.yml) file. It can be
accessed via `${{ secrets.GITHUB_TOKEN }}`. We've been using this token behind the scenes
a lot. Permissions are basically attached to the token.

You can also configure the action permissions via the settings page on GitHub.