// Some code used from https://github.com/benwinding/newsit/
import {
  CACHE_URL_DURATION_SEC,
  PROVIDER_REDDIT_NAME,
} from "../shared/constants";
import { cachedApiCall } from "../utils/cache";
import { log } from "../utils/log";
import { replaceTimeStr } from "../utils/time";
import {
  ProviderQueryType,
  ResultItem,
  ResultProvider,
  SingleProviderResults,
} from "./providers";

const cheerio = require("cheerio");

export class RedditResultProvider implements ResultProvider {
  getProviderName() {
    return PROVIDER_REDDIT_NAME;
  }

  // Main function to get all relevant results from Reddit
  async getExactUrlResults(url: string): Promise<SingleProviderResults> {
    const queryString = "sort=top&q=" + encodeURIComponent("url:" + url);
    const requestUrl = "https://old.reddit.com/search?" + queryString;
    const data = await cachedApiCall(requestUrl, false, CACHE_URL_DURATION_SEC);

    const $ = cheerio.load(data);
    const itemsAll = $(".search-result")
      .map((i: number, el: Element) => this.translateRedditToItem($(el).html()))
      .toArray();

    if (itemsAll.length === 0) {
      log.debug("Reddit API: No urls matches found");
      return {
        providerName: this.getProviderName(),
        queryType: ProviderQueryType.EXACT_URL,
        results: [],
      };
    }

    return {
      providerName: this.getProviderName(),
      queryType: ProviderQueryType.EXACT_URL,
      results: itemsAll,
    };
  }

  async getSiteUrlResults(url: string): Promise<SingleProviderResults> {
    const queryString = "sort=top&q=" + encodeURIComponent("site:" + url);
    const requestUrl = "https://old.reddit.com/search?" + queryString;
    const data = await cachedApiCall(requestUrl, false, CACHE_URL_DURATION_SEC);

    const $ = cheerio.load(data);
    const itemsAll = $(".search-result")
      .map((i: number, el: Element) => this.translateRedditToItem($(el).html()))
      .toArray();

    if (itemsAll.length === 0) {
      log.debug("Reddit API: No urls matches found");
      return {
        providerName: this.getProviderName(),
        queryType: ProviderQueryType.SITE_URL,
        results: [],
      };
    }

    return {
      providerName: this.getProviderName(),
      queryType: ProviderQueryType.SITE_URL,
      results: itemsAll,
    };
  }

  async getTitleResults(title: string): Promise<SingleProviderResults> {
    const queryString = "sort=top&q=" + encodeURIComponent("site:" + title);
    const requestUrl = "https://old.reddit.com/search?" + queryString;
    const data = await cachedApiCall(requestUrl, false, CACHE_URL_DURATION_SEC);

    const $ = cheerio.load(data);
    const itemsAll = $(".search-result")
      .map((i: number, el: Element) => this.translateRedditToItem($(el).html()))
      .toArray();

    if (itemsAll.length === 0) {
      log.debug("Reddit API: No urls matches found");
      return {
        providerName: this.getProviderName(),
        queryType: ProviderQueryType.TITLE,
        results: [],
      };
    }

    return {
      providerName: this.getProviderName(),
      queryType: ProviderQueryType.TITLE,
      results: itemsAll,
    };
  }

  translateRedditToItem(html: string): ResultItem {
    const $ = cheerio.load(html);

    const url = $(".search-link").attr("href");
    const commentsText = $(".search-comments").text();
    const commentsLink = $(".search-comments").attr("href");
    const postTitle = $(".search-title").text();
    const postDate = replaceTimeStr($(".search-time time").text());
    const postPointsText = $(".search-score").text();
    const postAuthor = $(".author").text();
    const postAuthorLink = $(".author").attr("href");
    const subreddit = $(".search-subreddit-link").text();
    const subredditLink = $(".search-subreddit-link").attr("href");

    const commentsCount = parseInt(
      commentsText?.replace(",", "")?.split(" ")?.shift() || "0"
    );
    const postPoints = parseInt(
      postPointsText?.replace(",", "")?.split(" ")?.shift() || "0"
    );

    const r: ResultItem = {
      rawHtml: html,
      submittedUrl: url,
      submittedTitle: postTitle,
      submittedDate: postDate,
      submittedUpvotes: postPoints,
      submittedBy: postAuthor,
      submittedByLink: postAuthorLink,
      commentsCount: commentsCount,
      commentsLink: commentsLink,
      subSourceName: subreddit,
      subSourceLink: subredditLink,
    };
    return r;
  }
}
