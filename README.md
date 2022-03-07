# Unified Communication Interface

## About UCI :open_book:

The Unified Communications Interface (UCI) aims to democratize the use of different communication channels such as WhatsApp, Telegram, SMS, email and more for governance use cases through a standard configurable manner that is reusable and scalable across all governance use cases.

## Features :dart:

- Ability to connect to any communication channel through any service provider without doing custom changes in the core logic UCI.
- The UCI ecosystem is independent of external variables like communication channel and service provider powered by XMessage standard.
- Ability to have a configurable conversation logic for the bot
- Ability to connect to any database (local or federated) via services
- Ability to include value added services in the bot interaction flow through Microservices (Internal or External)
- Ability to create tools on top of UCI APIs to manage Bot configuration, conversations and visualization

## Requirements :scroll:

[NodeJS](https://nodejs.org/en/download/) and NPM or [yarn]([https://yarnpkg.com/getting-started/install])

## Installation :walking:
### 1. Fork it :fork_and_knife:

You can get your own fork/copy of [UCI](https://github.com/Samagra-Development/uci-pwa) by using the <kbd><b>Fork</b></kbd> button.

### 2. Clone it :busts_in_silhouette:

You need to clone (download) it to a local machine using

```sh
git clone https://github.com/Your_Username/uci-pwa.git
```

> This makes a local copy of the repository in your machine.

Once you have cloned the `uci-pwa` repository in GitHub, move to that folder first using the change directory command.

```sh
# This will change directory to a folder FOSSologyUI
cd uci-pwa
```

Move to this folder for all other commands.

### 3. Set it up :arrow_up:

Run the following commands to see that _your local copy_ has a reference to _your forked remote repository_ in GitHub :octocat:

```sh
git remote -v
origin  https://github.com/Your_Username/uci-pwa.git (fetch)
origin  https://github.com/Your_Username/uci-pwa.git (push)
```
### 4. Run it :checkered_flag:

Open two terminal windows (on root folder)
- Run `yarn start` on first terminal window.
- Run `sudo docker run --name uci-ts-redis -p 6379:6379 redis` on second terminal window.
## Contributing

We really like contributions in several forms, see [CONTRIBUTING.md](CONTRIBUTING.md)
