export class Tab {
  constructor(tabs) {
    this.tabUIRoot = document.querySelector(".js-tab-ui");
    this.tabs = tabs;
    this.panels = document.querySelectorAll(".js-tabpanel");
    this.tabsLength = this.tabs.length;
    this.currentSelectedTabIndex = 0;
    this.currentFocusedTabIndex = 0;
    this.tabsLastIndex = this.tabsLength - 1;
  }

  getIndexOfTab(tabElement) {
    let matchedIndex = -1;
    for (let i = 0; i < this.tabsLength; i++) {
      if (this.tabs[i] === tabElement) {
        matchedIndex = i;
        break;
      }
    }
    return matchedIndex;
  }

  getCurrentSelectedTabIndex() {
    return this.currentSelectedTabIndex;
  }

  setCurrentSelectedTabIndex(index) {
    this.currentSelectedTabIndex = index;
  }

  onClickTab(event) {
    const clickedTab = event.currentTarget;
    const clickedIndex = this.getIndexOfTab(clickedTab);
    const currentIndex = this.getCurrentSelectedTabIndex();

    if (clickedIndex === currentIndex) {
      return;
    }

    this.changeTab(clickedIndex, currentIndex);

    this.setCurrentSelectedTabIndex(clickedIndex);
  }

  changeTab(nextIndex, currentIndex) {
    const nextTab = this.tabs[nextIndex];
    const nextPanel = this.panels[nextIndex];
    this.show(nextTab, nextPanel);

    if (currentIndex > -1) {
      const currentTab = this.tabs[currentIndex];
      const currentPanel = this.panels[currentIndex];
      this.hide(currentTab, currentPanel);
    }
  }

  show(tab, panel) {
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    panel.setAttribute("aria-hidden", "false");
  }

  hide(tab, panel) {
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", "-1");
    panel.setAttribute("aria-hidden", "true");
  }

  getCurrentFocusedTabIndex() {
    return this.currentFocusedTabIndex;
  }

  setCurrentFocusedTabIndex(index) {
    this.currentFocusedTabIndex = index;
  }

  onFocusTab(event) {
    const focusedTab = event.currentTarget;
    const focusedIndex = this.getIndexOfTab(focusedTab);
    const currentSelectedIndex = this.getCurrentSelectedTabIndex();

    this.setCurrentFocusedTabIndex(focusedIndex);
    if (focusedIndex === currentSelectedIndex) {
      return;
    }
    this.changeTab(focusedIndex, currentSelectedIndex);
    this.setCurrentSelectedTabIndex(focusedIndex);
  }

  onKeydownTab(event) {
    const key = event.key;

    switch (key) {
      case "ArrowRight":
      case "Right": // for IE, Edge 16-, Firefox 36-
        this.focusNextTab();
        break;
      case "ArrowLeft":
      case "Left": // for IE, Edge 16-, Firefox 36-
        this.focusPreviousTab();
        break;
      case "Home":
        this.focusTab(0);
        break;
      case "End":
        this.focusTab(this.tabsLastIndex);
        break;
    }
  }

  focusTab(index) {
    this.tabs[index].focus();
  }

  focusNextTab() {
    const currentIndex = this.getCurrentFocusedTabIndex();
    let nextIndex = currentIndex + 1;

    if (nextIndex > this.tabsLastIndex) {
      nextIndex = 0;
    }
    this.focusTab(nextIndex);
  }

  focusPreviousTab() {
    const currentIndex = this.getCurrentFocusedTabIndex();
    let nextIndex = currentIndex - 1;

    if (nextIndex < 0) {
      nextIndex = this.tabsLastIndex;
    }
    this.focusTab(nextIndex);
  }

  isSelectedTab(tab) {
    const ariaSelected = tab.getAttribute("aria-selected");

    return ariaSelected === "true";
  }

  init() {
    for (let i = 0; i < this.tabsLength; i++) {
      const tab = this.tabs[i];
      const isSelected = this.isSelectedTab(tab);

      if (isSelected) {
        this.changeTab(i);
        this.setCurrentSelectedTabIndex(i);
      }
    }
  }
}