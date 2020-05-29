export interface IVideoListRequstOptions {
  /** Data format for the response. */
  alt?: string;
  /** The chart parameter identifies the chart that you want to retrieve. */
  chart?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /**
   * The hl parameter instructs the API to retrieve localized resource metadata for a specific application language thatthe YouTube
   * website supports. The parameter value must be a language code included in the list returned by the i18nLanguages.list method.
   *
   * If localized resource details are available in that language, the resource's snippet.localized object will contain
   * the localized values. However, if localized details are not available, the snippet.localized object will contain resource details
   * in the resource's default language.
   */
  hl?: string;
  /**
   * The id parameter specifies a comma-separated list of the YouTube video ID(s) for the resource(s) that are being retrieved.
   * In a video resource, the id property specifies the video's ID.
   */
  id?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide
   *  an OAuth 2.0 token.
   */
  key?: string;
  /** DEPRECATED */
  locale?: string;
  /**
   * The maxHeight parameter specifies a maximum height of the embedded player. If maxWidth is provided, maxHeight may not be reached
   * in order to not violate the width request.
   */
  maxHeight?: number;
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   *
   * Note: This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use
   * in conjunction with the id parameter.
   */
  maxResults?: number;
  /**
   * The maxWidth parameter specifies a maximum width of the embedded player. If maxHeight is provided, maxWidth may not be reached
   * in order to not violate the height request.
   */
  maxWidth?: number;
  /** Set this parameter's value to like or dislike to instruct the API to only return videos liked or disliked by the authenticated user.
   */
  myRating?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /**
   * Note: This parameter is intended exclusively for YouTube content partners.
   *
   * The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting
   * on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
   * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and
   * channel data, without having to provide authentication credentials for each individual channel.
   * The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned.
   * In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   *
   * Note: This parameter is supported for use in conjunction with the myRating and chart parameters,
   * but it is not supported for use in conjunction with the id parameter.
   */
  pageToken?: string;
  /**
   * The part parameter specifies a comma-separated list of one or more video resource properties that the API response will include.
   *
   * If the parameter identifies a property that contains child properties, the child properties will be included in the response.
   * For example, in a video resource, the snippet property contains the channelId, title, description, tags, and categoryId properties.
   * As such, if you set part=snippet, the API response will contain all of those properties.
   */
  part: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
  quotaUser?: string;
  /**
   * The regionCode parameter instructs the API to select a video chart available in the specified region.
   * This parameter can only be used in conjunction
   * with the chart parameter. The parameter value is an ISO 3166-1 alpha-2 country code.
   */
  regionCode?: string;
  /** Deprecated. Please use quotaUser instead. */
  userIp?: string;
  /**
   * The videoCategoryId parameter identifies the video category for which the chart should be retrieved.
   * This parameter can only be used in conjunction
   * with the chart parameter. By default, charts are not restricted to a particular category.
   */
  videoCategoryId?: string;
}
