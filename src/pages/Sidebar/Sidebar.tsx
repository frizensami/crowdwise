import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

import { ProviderResults, ProviderResultType } from "../../providers/providers";
import { log } from "../../utils/log";
import ResultCard from "../../containers/ResultCard";
import { useHotkeys } from "react-hotkeys-hook";
import { sendMessageToActiveTab } from "../../utils/tabs";
import {
  DEFAULT_HOTKEYS_CLOSE_SIDEBAR,
  DEFAULT_HOTKEYS_TOGGLE_SIDEBAR,
  KEY_HOTKEYS_TOGGLE_SIDEBAR,
} from "../../shared/constants";
import { SettingsPanel } from "../../containers/SettingsPanel";
import { useChromeStorage } from "../../shared/useChromeStorage";
import ReactTooltip from "react-tooltip";
import "./Sidebar.css";

const EmptyDiscussionsState = () => (
  <>
    <img
      alt="Online discussions"
      className="mx-auto w-3/4 p-4 opacity-80"
      src={chrome.runtime.getURL("undraw_group_chat.svg")}
    />
    <div className="text-center text-base font-semibold">No discussions</div>
    <div className="text-center text-slate-500">
      We can't find any relevant discussions on this page.
    </div>
  </>
);

const Sidebar = () => {
  log.debug("Sidebar re-render");

  const [providerData, setProviderData] = useState<ProviderResults>({
    resultType: ProviderResultType.Ok,
    hackerNews: [],
    reddit: [],
  });
  const [isUpdatingResults, setIsUpdatingResults] = useState<boolean>(false);

  const [hotkeysToggleSidebar, setHotkeysToggleSidebar] = useChromeStorage(
    KEY_HOTKEYS_TOGGLE_SIDEBAR,
    DEFAULT_HOTKEYS_TOGGLE_SIDEBAR,
    []
  );

  // Toggle the side bar based on incoming message from further down in the component (close arrow)
  const handleMessage = (request: any, sender: any, sendResponse: any) => {
    log.debug("Content script received message that our tab's URL changed.");
    if (request.changedUrl) {
      updateProviderData();
    }
  };

  // Actual call to update current results
  const updateProviderData = () => {
    setIsUpdatingResults(true);
    log.debug("Sending message to background script to update provider info.");
    chrome.runtime.sendMessage(
      { getProviderData: true },
      (results: ProviderResults) => {
        // Received results from providers
        setIsUpdatingResults(false);
        log.debug("Printing provider data from background script...");
        log.debug(results);
        setProviderData(results);
        // Inform content script about how much new data there is
        sendMessageToActiveTab({
          newProviderDataCount:
            results.hackerNews.length + results.reddit.length,
        });
      }
    );
  };

  // When sidebar loads for the first time, ask for discussion data from providers.
  // We don't pass our URL to the background script. The script know what URL our tab is.
  // This avoids race conditions.
  useEffect(() => {
    // Add listener when component mounts
    chrome.runtime.onMessage.addListener(handleMessage);

    // Update provider info immediately at the start
    updateProviderData();

    // Remove listener when this component unmounts
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  // Open the card in a new tab
  const onCardClick = (url: string) => {
    window.open(url, "_blank");
  };
  const setClickedUrl = () => {};

  // Send a message to the extension (alternative: use redux?) to close
  const closeSideBar = () => sendMessageToActiveTab({ closeSideBar: true });
  const toggleSideBar = () => sendMessageToActiveTab({ toggleSideBar: true });

  // Hotkeys to control the sidebar visibility.
  // Note: The SideBar is reimplementing the same hotkey shortcuts because it will be within an iFrame
  useHotkeys(hotkeysToggleSidebar.join(","), toggleSideBar);
  useHotkeys(DEFAULT_HOTKEYS_CLOSE_SIDEBAR.join(","), closeSideBar);

  const noDiscussions =
    providerData.hackerNews.length === 0 && providerData.reddit.length === 0;

  return (
    <div className="flex h-full w-full flex-row">
      {isUpdatingResults && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75">
          <div className="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 ease-linear" />
          <h2 className="text-center text-xl font-semibold text-white">
            Loading backlinks...
          </h2>
        </div>
      )}

      {/*{clickedUrl && (*/}
      {/*  <div className="h-full w-[50vw] bg-slate-100 flex flex-col">*/}
      {/*    Hi*/}
      {/*    /!*<iframe src={clickedUrl} title="Selected Article" />*!/*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className="flex h-screen w-full flex-col border-x border-b border-slate-300 bg-slate-100">
        <div className="shrink-0 items-end border-b border-slate-300 bg-white pt-3 pb-2 ">
          <div className="text-md flex flex-row space-x-2 px-2">
            <div className="cursor-pointer" onClick={closeSideBar}>
              <p
                data-tip={hotkeysToggleSidebar
                  .join(", ")
                  .replaceAll("+", " + ")}
              >
                <ChevronRightIcon className="h-4 w-4 text-slate-500" />
              </p>
              <ReactTooltip place="right" type="dark" effect="solid" />
            </div>
            <div className="grow" />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button>
                    <CogIcon className="h-5 w-5 text-slate-500" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-4 sm:px-0 lg:max-w-3xl">
                      <SettingsPanel />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <div className="cursor-pointer">
              <QuestionMarkCircleIcon className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </div>
        <div className="grow space-y-3 p-3 text-left scrollbar scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-200">
          <p className="text-lg text-blue-700">Discussions</p>
          {noDiscussions ? (
            <EmptyDiscussionsState />
          ) : (
            <div className="space-y-2">
              <div className="flex flex-row space-x-2 align-bottom">
                <img
                  alt="Hacker News Icon"
                  className="my-auto h-4 w-4"
                  src={chrome.runtime.getURL("hackernews_icon.png")}
                />
                <p className="my-1 text-slate-500">Hacker News</p>
              </div>
              {providerData.hackerNews.map((result, index) => (
                <ResultCard
                  key={index}
                  result={result}
                  onCardClick={onCardClick}
                />
              ))}
              <div className="flex flex-row space-x-2 align-bottom">
                <img
                  alt="Reddit Icon"
                  className="my-auto h-5 w-5"
                  src={chrome.runtime.getURL("reddit_icon.png")}
                />
                <p className="my-1 text-slate-500">Reddit</p>
              </div>
              {providerData.reddit.map((result, index) => (
                <ResultCard
                  key={index}
                  result={result}
                  onCardClick={onCardClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
