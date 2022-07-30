import { distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

export class ScrollObserver {
  scrolledToBottom$ = fromEvent(window, 'scroll').pipe(
    map(() => this.isScrollAtTheBottom()),
    distinctUntilChanged(),
    filter((isBottom) => isBottom === true)
  );

  isScrollAtTheBottom() {
    return (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 100
    );
  }
}
