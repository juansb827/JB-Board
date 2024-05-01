- Features
  - COdegen COntexet Type
  - Show default team on load?
  - Dataloader
  - Crud for teams
  - Team Settings Page
  - Team leave
  - Invite to team{ id: string; name: string }
  - UI when user has no teams
- Technical
  - remove tsnode and nodemon
  - optimize query invalidation on FE
    - optimize create board, rn it invalidates all boards, instead of a single team
  - Generic CrudService/Repository/Resolver
  - UpdatedAT trigger
  - Prefetch on Server Components
    https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
  - Refetch using tags
- Others

  - DB diagram

- abac policies
- mhttps://profy.dev/article/react-architecture-api-layer#the-final-result
- https://nextjs.org/docs/app/building-your-application/rendering
- Forward Ref
- hooks
- next router vs navigation
- ts module/namespaces
