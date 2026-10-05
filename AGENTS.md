<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Game catalog is a static JSON snapshot from the GameDistribution public feed in `src/data/games.json`; regenerate from the feed rather than hand-editing, so thumbnails stay official.
- User data (profiles, favorites, play_history) lives in Lovable Cloud with per-user RLS; avatars are stored as small resized data URLs on the profile because public storage buckets are blocked in this workspace.
- Primary discovery navigation lives in the shared collapsible sidebar so categories and featured games stay accessible on every route without duplicating them in page content.
