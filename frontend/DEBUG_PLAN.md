# Debugging and Fixing Plan - zbuild-farm-audit

This plan addresses the bugs and architectural smells identified during the project audit and manual code review.

## 1. High Priority Fixes (Stability & Crashes)
- **[SERVICE] `evidenceStorageService.ts`**: Replace non-null assertions (`this.db!`) with proper initialization checks to prevent runtime crashes.
- **[PERF] `Audits.tsx` Submission Logic**: Optimize evidence lookup from $O(N \times M)$ to $O(1)$ using a Map to prevent UI freezing during large audit submissions.

## 2. Medium Priority Fixes (Memory & Logic)
- **[MEMORY] `Audits.tsx` Evidence Previews**: Implement proper cleanup for `URL.createObjectURL` and add `AbortController` to `loadPreviews` to prevent memory leaks and race conditions.
- **[LOGIC] `CorrectiveActions.tsx` Form Sync**: Fix the `useState` initialization bug in `CAForm` by adding a `useEffect` to sync state when props change.
- **[LOGIC] `scoringService.ts` Risk Levels**: Differentiate between "Low Score" and "Critical Item Failure" in `getRiskLevel` to provide better diagnostic clarity.

## 3. Low Priority & Refactoring (Quality & UX)
- **[TYPE] Type Safety**: Replace `any` types in `Audits.tsx` and other pages with concrete domain types.
- **[UI] `CorrectiveActions.tsx` Status Update**: Ensure local state is only updated after successful repository confirmation.
- **[LOGIC] `Audits.tsx` Score Calculation**: Add division-by-zero guard for category score calculations.
- **[ARCH] `Audits.tsx` Decomposition**: Split the monolithic `Audits.tsx` into smaller, focused components.

## Execution Strategy
Fixes will be applied in order of priority. Each set of changes will be verified for regressions.
