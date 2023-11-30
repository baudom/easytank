# easytank

_yes, another gas station finder 😆_

**Powered by**

-   ⚡ [Next.js][next_home] project bootstrapped with [create-next-app][create-next-link_home] and [mantine][mantine_home]
-   ⛽ [Tankerkoenig API][tankerkoenig_home]
-   🌍 [Nominatim OpenStreetMap][nominatim_home]

## Environment configuration

```dotenv
# values are set by default
NEXT_PUBLIC_NAME=$npm_package_name
NEXT_PUBLIC_VERSION=$npm_package_version
NEXT_PUBLIC_AUTHOR=$npm_package_author_name
NEXT_PUBLIC_AUTHOR_URL=$npm_package_author_url
NEXT_PUBLIC_REPOSITORY_URL=$npm_package_repositoryUrl

# .env.local config
TANKERKOENIG_API_KEY=your-api-key
NOMINATIM_USER_AGENT=your-user-agent
NEXT_PUBLIC_CONTACT_MAIL=your@contact.mail
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`][next_font] to automatically optimize and
load Nunito, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation][next_docs] - learn about Next.js features and API.
-   [Learn Next.js][next_learn] - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository][next_repo] - your feedback and contributions are welcome!

[next_home]: https://nextjs.org
[create-next-link_home]: https://github.com/vercel/next.js/tree/canary/packages/create-next-app
[mantine_home]: https://mantine.dev
[tankerkoenig_home]: https://creativecommons.tankerkoenig.de/
[nominatim_home]: https://nominatim.openstreetmap.org
[next_font]: https://nextjs.org/docs/basic-features/font-optimization
[next_docs]: https://nextjs.org/docs
[next_learn]: https://nextjs.org/learn
[next_repo]: https://github.com/vercel/next.js
