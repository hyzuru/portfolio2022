export class Drawer {
  constructor(openButton, closeButton, drawer, anchorLinks, firstTabbable, lastTabbable) {
    Object.assign(this, { openButton, closeButton, drawer, anchorLinks, firstTabbable, lastTabbable });
    this.drawerOpen = false;
    this.rootElement = document.documentElement;
    this.scrollLockModifier = "is-drawer-open";
    this.focusOpenButtonAfterClose = true;
  }

  changeAriaExpanded(state) {
    const value = state ? "true" : "false";
    this.drawer.setAttribute("aria-expanded", value);
    this.openButton.setAttribute("aria-expanded", value);
    this.closeButton.setAttribute("aria-expanded", value);
  }

  changeState(state) {
    if (state === this.drawerOpen) {
      console.log("2回以上連続で同じ状態に変更しようとしました");
      return;
    }
    this.changeAriaExpanded(state);
    this.drawerOpen = state;
  }

  openDrawer() {
    this.focusOpenButtonAfterClose = true;
    this.changeState(true);
  }

  closeDrawer() {
    this.changeState(false);
  }

  onClickOpenButton() {
    this.activateScrollLock();
    this.openDrawer();
    this.firstTabbable.focus();
  }

  onClickCloseButton() {
    this.closeDrawer();
  }

  activateScrollLock() {
    this.rootElement.classList.add(this.scrollLockModifier);
  }

  deactivateScrollLock() {
    this.rootElement.classList.remove(this.scrollLockModifier);
  }

  onTransitionendDrawer(event) {
    if (event.target !== this.drawer || event.propertyName !== "visibility") {
      return;
    }
    if (!this.drawerOpen) {
      this.deactivateScrollLock();
      if (this.focusOpenButtonAfterClose) {
        this.openButton.focus();
      }
    }
  }

  onKeydownTabKeyFirstTabbable(event) {
    if(event.key !== "Tab" || !event.shiftKey) {
      return;
    }
    event.preventDefault();
    this.lastTabbable.focus();
  }

  onKeydownTabKeyLastTabbable(event) {
    if(event.key !== "Tab" || event.shiftKey) {
      return;
    }
    event.preventDefault();
    this.firstTabbable.focus();
  }

  onKeydownEsc(event) {
    if(!this.drawerOpen || event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    this.closeDrawer();
  }

  onClickAnchorLink(event) {
    this.focusOpenButtonAfterClose = false;
    this.closeDrawer();
  }
}