
function DILgetCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) if (x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")), y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1), x = x.replace(/^\s+|\s+$/g, ""), x == c_name) return unescape(y)
}
function DIL_ZeroFormat(num, max) {
    for (var tmp = "" + num; tmp.length < max;) tmp = "0" + tmp;
    return tmp
}
function MedibaAdPortalClient(set_obj) {
    return {
        getSettings: function() {
            var s = set_obj;
            return {
                auid: "undefined" != typeof s.auid ? s.auid : null,
                idLoadAborted: "undefined" != typeof s.idLoadAborted && s.idLoadAborted,
                formatType: "undefined" != typeof s.formatType ? s.formatType : "json"
            }
        },
        getAdRequestURL: function() {
            var settings = set_obj,
                sdk_type = "0",
                sdk_ver = "1.0.0",
                is_first = !1,
                ref = document.referrer ? document.referrer : null,
                allParams = "?auid=" + settings.auid + "&sdk_type=" + sdk_type + "&sdk_ver=" + sdk_ver + "&format=" + settings.formatType + "&is_first=" + is_first;
            return allParams = allParams + "&origin_url=" + encodeURIComponent(window.location.href), null != ref && (allParams = allParams + "&ref=" + ref), allParams += "&randref=" + Date.now(), PortalAd.settings.getAdUrl + allParams
        }
    }
}
"function" != typeof window.DIL && (window.DIL = function(a, c) {
    var b, g, d = [];
    a !== Object(a) && (a = {});
    var f, k, n, u, s, m, p, y, x, J, K, D;
    f = a.partner, k = a.containerNSID, n = !! a.disableDestinationPublishingIframe, u = a.iframeAkamaiHTTPS, s = a.mappings, m = a.uuidCookie, p = !0 === a.enableErrorReporting, y = a.visitorService, x = a.declaredId, J = !0 === a.removeFinishedScriptsAndCallbacks, K = !0 === a.delayAllUntilWindowLoad, D = !0 === a.disableIDSyncs;
    var L, M, N, G, E, O, P, Q;
    L = !0 === a.disableScriptAttachment, M = !0 === a.disableCORSFiring, N = !0 === a.disableDefaultRequest, G = a.afterResultForDefaultRequest, E = a.dpIframeSrc, O = !0 === a.testCORS, P = !0 === a.useJSONPOnly, Q = a.visitorConstructor, p && DIL.errorModule.activate();
    var R = !0 === window._dil_unit_tests;
    if ((b = c) && d.push(b + ""), !f || "string" != typeof f) return b = "DIL partner is invalid or not specified in initConfig", DIL.errorModule.handleError({
        name: "error",
        message: b,
        filename: "dil.js"
    }), Error(b);
    if (b = "DIL containerNSID is invalid or not specified in initConfig, setting to default of 0", (k || "number" == typeof k) && (k = parseInt(k, 10), !isNaN(k) && 0 <= k && (b = "")), b && (k = 0, d.push(b), b = ""), g = DIL.getDil(f, k), g instanceof DIL && g.api.getPartner() === f && g.api.getContainerNSID() === k) return g;
    if (!(this instanceof DIL)) return new DIL(a, "DIL was not instantiated with the 'new' operator, returning a valid instance with partner = " + f + " and containerNSID = " + k);
    DIL.registerDil(this, f, k);
    var B = {
        IS_HTTPS: "https:" === document.location.protocol,
        POST_MESSAGE_ENABLED: !! window.postMessage,
        COOKIE_MAX_EXPIRATION_DATE: "Tue, 19 Jan 2038 03:14:07 UTC"
    }, H = {
        stuffed: {}
    }, l = {}, q = {
        firingQueue: [],
        fired: [],
        firing: !1,
        sent: [],
        errored: [],
        reservedKeys: {
            sids: !0,
            pdata: !0,
            logdata: !0,
            callback: !0,
            postCallbackFn: !0,
            useImageRequest: !0
        },
        callbackPrefix: "demdexRequestCallback",
        firstRequestHasFired: !1,
        useJSONP: !0,
        abortRequests: !1,
        num_of_jsonp_responses: 0,
        num_of_jsonp_errors: 0,
        num_of_cors_responses: 0,
        num_of_cors_errors: 0,
        corsErrorSources: [],
        num_of_img_responses: 0,
        num_of_img_errors: 0,
        toRemove: [],
        removed: [],
        readyToRemove: !1,
        platformParams: {
            d_nsid: k + "",
            d_rtbd: "json",
            d_jsonv: DIL.jsonVersion + "",
            d_dst: "1"
        },
        nonModStatsParams: {
            d_rtbd: !0,
            d_dst: !0,
            d_cts: !0,
            d_rs: !0
        },
        modStatsParams: null,
        adms: {
            TIME_TO_CATCH_ALL_REQUESTS_RELEASE: 2e3,
            calledBack: !1,
            mid: null,
            noVisitorAPI: !1,
            instance: null,
            releaseType: "no VisitorAPI",
            admsProcessingStarted: !1,
            process: function(e) {
                try {
                    if (!this.admsProcessingStarted) {
                        this.admsProcessingStarted = !0;
                        var a, h, b, d, c, t = this;
                        if ("function" == typeof e && "function" == typeof e.getInstance) {
                            if (y !== Object(y) || !(a = y.namespace) || "string" != typeof a) return this.releaseType = "no namespace", void this.releaseRequests();
                            if (h = e.getInstance(a, {
                                idSyncContainerID: k
                            }), h === Object(h) && "function" == typeof h.isAllowed && "function" == typeof h.getMarketingCloudVisitorID && "function" == typeof h.getCustomerIDs) return h.isAllowed() ? (this.instance = h, b = function(e) {
                                "VisitorAPI" !== t.releaseType && (t.mid = e, t.releaseType = "VisitorAPI", t.releaseRequests())
                            }, R && (d = y.server) && "string" == typeof d && (h.server = d), c = h.getMarketingCloudVisitorID(b), "string" == typeof c && c.length ? void b(c) : void setTimeout(function() {
                                "VisitorAPI" !== t.releaseType && (t.releaseType = "timeout", t.releaseRequests())
                            }, this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE)) : (this.releaseType = "VisitorAPI not allowed", void this.releaseRequests());
                            this.releaseType = "invalid instance"
                        } else this.noVisitorAPI = !0;
                        this.releaseRequests()
                    }
                } catch (f) {
                    this.releaseRequests()
                }
            },
            releaseRequests: function() {
                this.calledBack = !0, q.registerRequest()
            },
            getMarketingCloudVisitorID: function() {
                return this.instance ? this.instance.getMarketingCloudVisitorID() : null
            },
            getMIDQueryString: function() {
                var e = w.isPopulatedString,
                    t = this.getMarketingCloudVisitorID();
                return e(this.mid) && this.mid === t || (this.mid = t), e(this.mid) ? "d_mid=" + this.mid + "&" : ""
            },
            getCustomerIDs: function() {
                return this.instance ? this.instance.getCustomerIDs() : null
            },
            getCustomerIDsQueryString: function(e) {
                if (e === Object(e)) {
                    var b, d, t = "",
                        a = [],
                        h = [];
                    for (b in e) e.hasOwnProperty(b) && (h[0] = b, d = e[b], d === Object(d) && (h[1] = d.id || "", h[2] = d.authState || 0, a.push(h), h = []));
                    if (h = a.length) for (e = 0; e < h; e++) t += "&d_cid_ic=" + a[e].join("%01");
                    return t
                }
                return ""
            }
        },
        declaredId: {
            declaredId: {
                init: null,
                request: null
            },
            declaredIdCombos: {},
            setDeclaredId: function(e, t) {
                var a = w.isPopulatedString,
                    h = encodeURIComponent;
                if (e === Object(e) && a(t)) {
                    var b = e.dpid,
                        d = e.dpuuid,
                        c = null;
                    if (a(b) && a(d)) return c = h(b) + "$" + h(d), !0 === this.declaredIdCombos[c] ? "setDeclaredId: combo exists for type '" + t + "'" : (this.declaredIdCombos[c] = !0, this.declaredId[t] = {
                        dpid: b,
                        dpuuid: d
                    }, "setDeclaredId: succeeded for type '" + t + "'")
                }
                return "setDeclaredId: failed for type '" + t + "'"
            },
            getDeclaredIdQueryString: function() {
                var e = this.declaredId.request,
                    t = this.declaredId.init,
                    a = "";
                return null !== e ? a = "&d_dpid=" + e.dpid + "&d_dpuuid=" + e.dpuuid : null !== t && (a = "&d_dpid=" + t.dpid + "&d_dpuuid=" + t.dpuuid), a
            }
        },
        registerRequest: function(e) {
            var a = this.firingQueue;
            e === Object(e) && a.push(e), this.firing || !a.length || K && !DIL.windowLoaded || !this.adms.calledBack || (e = a.shift(), e.src = e.src.replace(/demdex.net\/event\?d_nsid=/, "demdex.net/event?" + this.adms.getMIDQueryString() + "d_nsid="), w.isPopulatedString(e.corsPostData) && (e.corsPostData = e.corsPostData.replace(/^d_nsid=/, this.adms.getMIDQueryString() + "d_nsid=")), C.fireRequest(e), this.firstRequestHasFired || "script" !== e.tag && "cors" !== e.tag || (this.firstRequestHasFired = !0))
        },
        processVisitorAPI: function() {
            this.adms.process(Q || window.Visitor)
        },
        requestRemoval: function(e) {
            if (!J) return "removeFinishedScriptsAndCallbacks is not boolean true";
            var r, h, a = this.toRemove;
            if (e === Object(e) && (r = e.script, h = e.callbackName, (r === Object(r) && "SCRIPT" === r.nodeName || "no script created" === r) && "string" == typeof h && h.length && a.push(e)), this.readyToRemove && a.length) {
                h = a.shift(), r = h.script, h = h.callbackName, "no script created" !== r ? (e = r.src, r.parentNode.removeChild(r)) : e = r, window[h] = null;
                try {
                    delete window[h]
                } catch (b) {}
                return this.removed.push({
                    scriptSrc: e,
                    callbackName: h
                }), DIL.variables.scriptsRemoved.push(e), DIL.variables.callbacksRemoved.push(h), this.requestRemoval()
            }
            return "requestRemoval() processed"
        }
    };
    g = function() {
        var e = "http://fast.",
            a = "?d_nsid=" + k + "#" + encodeURIComponent(document.location.href);
        return "string" == typeof E && E.length ? E + a : (B.IS_HTTPS && (e = !0 === u ? "https://fast." : "https://"), e + f + ".demdex.net/dest5.html" + a)
    };
    var z = {
        THROTTLE_START: 3e4,
        throttleTimerSet: !1,
        id: "destination_publishing_iframe_" + f + "_" + k,
        url: g(),
        iframe: null,
        iframeHasLoaded: !1,
        sendingMessages: !1,
        messages: [],
        messagesPosted: [],
        messageSendingInterval: B.POST_MESSAGE_ENABLED ? 15 : 100,
        ibsDeleted: [],
        jsonProcessed: [],
        newIframeCreated: null,
        iframeIdChanged: !1,
        originalIframeHasLoadedAlready: null,
        attachIframe: function() {
            function e() {
                h = document.createElement("iframe"), h.id = b.id, h.style.cssText = "display: none; width: 0; height: 0;", h.src = b.url, b.newIframeCreated = !0, a(), document.body.appendChild(h)
            }
            function a() {
                v.addListener(h, "load", function() {
                    h.className = "aamIframeLoaded", b.iframeHasLoaded = !0, b.requestToProcess()
                })
            }
            var b = this,
                h = document.getElementById(this.id);
            h ? "IFRAME" !== h.nodeName ? (this.id += "_2", this.iframeIdChanged = !0, e()) : (this.newIframeCreated = !1, "aamIframeLoaded" !== h.className ? (this.originalIframeHasLoadedAlready = !1, a()) : (this.iframeHasLoaded = this.originalIframeHasLoadedAlready = !0, this.requestToProcess())) : e(), this.iframe = h
        },
        requestToProcess: function(e, a) {
            var b = this;
            e && !w.isEmptyObject(e) && this.process(e, a), this.iframeHasLoaded && this.messages.length && !this.sendingMessages && (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function() {
                b.messageSendingInterval = B.POST_MESSAGE_ENABLED ? 15 : 150
            }, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
        },
        process: function(e, a) {
            var h, d, c, f, g, k, b = encodeURIComponent;
            if (a === Object(a) && (k = v.encodeAndBuildRequest(["", a.dpid || "", a.dpuuid || ""], ",")), (h = e.dests) && h instanceof Array && (d = h.length)) for (c = 0; c < d; c++) f = h[c], f = [b("dests"), b(f.id || ""), b(f.y || ""), b(f.c || "")], this.addMessage(f.join("|"));
            if ((h = e.ibs) && h instanceof Array && (d = h.length)) for (c = 0; c < d; c++) f = h[c], f = [b("ibs"), b(f.id || ""), b(f.tag || ""), v.encodeAndBuildRequest(f.url || [], ","), b(f.ttl || ""), "", k], this.addMessage(f.join("|"));
            if ((h = e.dpcalls) && h instanceof Array && (d = h.length)) for (c = 0; c < d; c++) f = h[c], g = f.callback || {}, g = [g.obj || "", g.fn || "", g.key || "", g.tag || "", g.url || ""], f = [b("dpm"), b(f.id || ""), b(f.tag || ""), v.encodeAndBuildRequest(f.url || [], ","), b(f.ttl || ""), v.encodeAndBuildRequest(g, ","), k], this.addMessage(f.join("|"));
            this.jsonProcessed.push(e)
        },
        addMessage: function(e) {
            var a = encodeURIComponent,
                a = a(p ? "---destpub-debug---" : "---destpub---");
            this.messages.push(a + e)
        },
        sendMessages: function() {
            var a, e = this;
            this.messages.length ? (a = this.messages.shift(), DIL.xd.postMessage(a, this.url, this.iframe.contentWindow), this.messagesPosted.push(a), setTimeout(function() {
                e.sendMessages()
            }, this.messageSendingInterval)) : this.sendingMessages = !1
        }
    }, I = {
        traits: function(e) {
            return w.isValidPdata(e) && (l.sids instanceof Array || (l.sids = []), v.extendArray(l.sids, e)), this
        },
        pixels: function(e) {
            return w.isValidPdata(e) && (l.pdata instanceof Array || (l.pdata = []), v.extendArray(l.pdata, e)), this
        },
        logs: function(e) {
            return w.isValidLogdata(e) && (l.logdata !== Object(l.logdata) && (l.logdata = {}), v.extendObject(l.logdata, e)), this
        },
        customQueryParams: function(e) {
            return w.isEmptyObject(e) || v.extendObject(l, e, q.reservedKeys), this
        },
        signals: function(e, a) {
            var b, h = e;
            if (!w.isEmptyObject(h)) {
                if (a && "string" == typeof a) for (b in h = {}, e) e.hasOwnProperty(b) && (h[a + b] = e[b]);
                v.extendObject(l, h, q.reservedKeys)
            }
            return this
        },
        declaredId: function(e) {
            return q.declaredId.setDeclaredId(e, "request"), this
        },
        result: function(e) {
            return "function" == typeof e && (l.callback = e), this
        },
        afterResult: function(e) {
            return "function" == typeof e && (l.postCallbackFn = e), this
        },
        useImageRequest: function() {
            return l.useImageRequest = !0, this
        },
        clearData: function() {
            return l = {}, this
        },
        submit: function() {
            return C.submitRequest(l), l = {}, this
        },
        getPartner: function() {
            return f
        },
        getContainerNSID: function() {
            return k
        },
        getEventLog: function() {
            return d
        },
        getState: function() {
            var e = {}, a = {};
            return v.extendObject(e, q, {
                callbackPrefix: !0,
                useJSONP: !0,
                registerRequest: !0
            }), v.extendObject(a, z, {
                attachIframe: !0,
                requestToProcess: !0,
                process: !0,
                sendMessages: !0
            }), {
                pendingRequest: l,
                otherRequestInfo: e,
                destinationPublishingInfo: a
            }
        },
        idSync: function(e) {
            if (D) return "Error: id syncs have been disabled";
            if (e !== Object(e) || "string" != typeof e.dpid || !e.dpid.length) return "Error: config or config.dpid is empty";
            if ("string" != typeof e.url || !e.url.length) return "Error: config.url is empty";
            var d, a = e.url,
                b = e.minutesToLive,
                h = encodeURIComponent,
                a = a.replace(/^https:/, "").replace(/^http:/, "");
            if ("undefined" == typeof b) b = 20160;
            else if (b = parseInt(b, 10), isNaN(b) || 0 >= b) return "Error: config.minutesToLive needs to be a positive number";
            return d = v.encodeAndBuildRequest(["", e.dpid, e.dpuuid || ""], ","), e = ["ibs", h(e.dpid), "img", h(a), b, "", d], z.addMessage(e.join("|")), q.firstRequestHasFired && z.requestToProcess(), "Successfully queued"
        },
        aamIdSync: function(e) {
            return D ? "Error: id syncs have been disabled" : e === Object(e) && "string" == typeof e.dpuuid && e.dpuuid.length ? (e.url = "//dpm.demdex.net/ibs:dpid=" + e.dpid + "&dpuuid=" + e.dpuuid, this.idSync(e)) : "Error: config or config.dpuuid is empty"
        },
        passData: function(e) {
            return w.isEmptyObject(e) ? "Error: json is empty or not an object" : (z.ibsDeleted.push(e.ibs), delete e.ibs, C.defaultCallback(e), e)
        },
        getPlatformParams: function() {
            return q.platformParams
        },
        getEventCallConfigParams: function() {
            var h, e = q,
                a = e.modStatsParams,
                b = e.platformParams;
            if (!a) {
                a = {};
                for (h in b) b.hasOwnProperty(h) && !e.nonModStatsParams[h] && (a[h.replace(/^d_/, "")] = b[h]);
                e.modStatsParams = a
            }
            return a
        }
    }, C = {
        corsMetadata: function() {
            var e = "none",
                a = !0;
            return "undefined" != typeof XMLHttpRequest && XMLHttpRequest === Object(XMLHttpRequest) && ("withCredentials" in new XMLHttpRequest ? e = "XMLHttpRequest" : new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/")() ? e = "XMLHttpRequest" : "undefined" != typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (a = !1), 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && (a = !1)), {
                corsType: e,
                corsCookiesEnabled: a
            }
        }(),
        getCORSInstance: function() {
            return "none" === this.corsMetadata.corsType ? null : new window[this.corsMetadata.corsType]
        },
        submitRequest: function(e) {
            return q.registerRequest(C.createQueuedRequest(e)), !0
        },
        createQueuedRequest: function(e) {
            var b, c, a = q,
                h = e.callback,
                d = "img";
            if (!w.isEmptyObject(s)) {
                var f, g, m;
                for (f in s) s.hasOwnProperty(f) && (g = s[f], null != g && "" !== g && f in e && !(g in e || g in q.reservedKeys) && (m = e[f], null != m && "" !== m && (e[g] = m)))
            }
            return w.isValidPdata(e.sids) || (e.sids = []), w.isValidPdata(e.pdata) || (e.pdata = []), w.isValidLogdata(e.logdata) || (e.logdata = {}), e.logdataArray = v.convertObjectToKeyValuePairs(e.logdata, "=", !0), e.logdataArray.push("_ts=" + (new Date).getTime()), "function" != typeof h && (h = this.defaultCallback), a.useJSONP = !0 !== e.useImageRequest, a.useJSONP && (d = "script", b = a.callbackPrefix + "_" + k + "_" + (new Date).getTime()), a = this.makeRequestSrcData(e, b), !P && (c = this.getCORSInstance()) && a.truncated && (this.corsMetadata.corsCookiesEnabled || a.isDeclaredIdCall) && (d = "cors"), {
                tag: d,
                src: a.src,
                corsSrc: a.corsSrc,
                internalCallbackName: b,
                callbackFn: h,
                postCallbackFn: e.postCallbackFn,
                useImageRequest: !! e.useImageRequest,
                requestData: e,
                corsInstance: c,
                corsPostData: a.corsPostData,
                hasCORSError: !1
            }
        },
        defaultCallback: function(e, a) {
            var b, h, d, c, f, g, k, x, p;
            if ((b = e.stuff) && b instanceof Array && (h = b.length)) for (d = 0; d < h; d++)(c = b[d]) && c === Object(c) && (f = c.cn, g = c.cv, k = c.ttl, "undefined" != typeof k && "" !== k || (k = Math.floor(v.getMaxCookieExpiresInMinutes() / 60 / 24)), x = c.dmn || "." + document.domain.replace(/^www\./, ""), p = c.type, f && (g || "number" == typeof g) && ("var" !== p && (k = parseInt(k, 10)) && !isNaN(k) && v.setCookie(f, g, 1440 * k, "/", x, !1), H.stuffed[f] = g));
            b = e.uuid, w.isPopulatedString(b) && !w.isEmptyObject(m) && (h = m.path, "string" == typeof h && h.length || (h = "/"), d = parseInt(m.days, 10), isNaN(d) && (d = 100), v.setCookie(m.name || "aam_did", b, 1440 * d, h, m.domain || "." + document.domain.replace(/^www\./, ""), !0 === m.secure)), n || q.abortRequests || z.requestToProcess(e, a)
        },
        makeRequestSrcData: function(e, a) {
            e.sids = w.removeEmptyArrayValues(e.sids || []), e.pdata = w.removeEmptyArrayValues(e.pdata || []);
            var b = q,
                d = b.platformParams,
                c = v.encodeAndBuildRequest(e.sids, ","),
                g = v.encodeAndBuildRequest(e.pdata, ","),
                m = (e.logdataArray || []).join("&");
            delete e.logdataArray;
            var A, x = B.IS_HTTPS ? "https://" : "http://",
                p = b.declaredId.getDeclaredIdQueryString(),
                s = b.adms.instance ? b.adms.getCustomerIDsQueryString(b.adms.getCustomerIDs()) : "";
            A = [];
            var l, n, u, y;
            for (l in e) if (!(l in b.reservedKeys) && e.hasOwnProperty(l)) if (n = e[l], l = encodeURIComponent(l), n instanceof Array) for (u = 0, y = n.length; u < y; u++) A.push(l + "=" + encodeURIComponent(n[u]));
            else A.push(l + "=" + encodeURIComponent(n));
            return A = A.length ? "&" + A.join("&") : "", l = !1, c = "d_nsid=" + d.d_nsid + p + s + (c.length ? "&d_sid=" + c : "") + (g.length ? "&d_px=" + g : "") + (m.length ? "&d_ld=" + encodeURIComponent(m) : ""), d = "&d_rtbd=" + d.d_rtbd + "&d_jsonv=" + d.d_jsonv + "&d_dst=" + d.d_dst, x = x + f + ".demdex.net/event", g = b = x + "?" + c + (b.useJSONP ? d + "&d_cb=" + (a || "") : "") + A, 2048 < b.length && (b = b.substring(0, b.lastIndexOf("&")), l = !0), {
                corsSrc: x + "?" + (O ? "testcors=1&d_nsid=" + k + "&" : "") + "_ts=" + (new Date).getTime(),
                src: b,
                originalSrc: g,
                truncated: l,
                corsPostData: c + d + A,
                isDeclaredIdCall: "" !== p
            }
        },
        fireRequest: function(e) {
            if ("img" === e.tag) this.fireImage(e);
            else {
                var a = q.declaredId,
                    a = a.declaredId.request || a.declaredId.init || {}, a = {
                        dpid: a.dpid || "",
                        dpuuid: a.dpuuid || ""
                    };
                "script" === e.tag ? this.fireScript(e, a) : "cors" === e.tag && this.fireCORS(e, a)
            }
        },
        fireImage: function(e) {
            var c, h, a = q;
            a.abortRequests || (a.firing = !0, c = new Image(0, 0), a.sent.push(e), c.onload = function() {
                a.firing = !1, a.fired.push(e), a.num_of_img_responses++, a.registerRequest()
            }, h = function(c) {
                b = "imgAbortOrErrorHandler received the event of type " + c.type, d.push(b), a.abortRequests = !0, a.firing = !1, a.errored.push(e), a.num_of_img_errors++, a.registerRequest()
            }, c.addEventListener ? (c.addEventListener("error", h, !1), c.addEventListener("abort", h, !1)) : c.attachEvent && (c.attachEvent("onerror", h), c.attachEvent("onabort", h)), c.src = e.src)
        },
        fireScript: function(a, c) {
            var k, m, g = this,
                h = q,
                x = a.src,
                p = a.postCallbackFn,
                l = "function" == typeof p,
                s = a.internalCallbackName;
            h.abortRequests || (h.firing = !0, window[s] = function(g) {
                try {
                    g !== Object(g) && (g = {}), D && (z.ibsDeleted.push(g.ibs), delete g.ibs);
                    var k = a.callbackFn;
                    h.firing = !1, h.fired.push(a), h.num_of_jsonp_responses++, k(g, c), l && p(g, c)
                } catch (r) {
                    r.message = "DIL jsonp callback caught error with message " + r.message, b = r.message, d.push(b), r.filename = r.filename || "dil.js", r.partner = f, DIL.errorModule.handleError(r);
                    try {
                        k({
                            error: r.name + "|" + r.message
                        }, c), l && p({
                            error: r.name + "|" + r.message
                        }, c)
                    } catch (x) {}
                } finally {
                    h.requestRemoval({
                        script: m,
                        callbackName: s
                    }), h.registerRequest()
                }
            }, L ? (h.firing = !1, h.requestRemoval({
                script: "no script created",
                callbackName: s
            })) : (m = document.createElement("script"), m.addEventListener && m.addEventListener("error", function(c) {
                h.requestRemoval({
                    script: m,
                    callbackName: s
                }), b = "jsonp script tag error listener received the event of type " + c.type + " with src " + x, g.handleScriptError(b, a)
            }, !1), m.type = "text/javascript", m.src = x, k = DIL.variables.scriptNodeList[0], k.parentNode.insertBefore(m, k)), h.sent.push(a), h.declaredId.declaredId.request = null)
        },
        fireCORS: function(a, c) {
            function g(r) {
                var m;
                try {
                    if (m = JSON.parse(r), m !== Object(m)) return void h.handleCORSError(a, c, "Response is not JSON")
                } catch (p) {
                    return void h.handleCORSError(a, c, "Error parsing response as JSON")
                }
                try {
                    var x = a.callbackFn;
                    k.firing = !1, k.fired.push(a), k.num_of_cors_responses++, x(m, c), n && s(m, c)
                } catch (l) {
                    l.message = "DIL handleCORSResponse caught error with message " + l.message, b = l.message, d.push(b), l.filename = l.filename || "dil.js", l.partner = f, DIL.errorModule.handleError(l);
                    try {
                        x({
                            error: l.name + "|" + l.message
                        }, c), n && s({
                            error: l.name + "|" + l.message
                        }, c)
                    } catch (q) {}
                } finally {
                    k.registerRequest()
                }
            }
            var h = this,
                k = q,
                m = this.corsMetadata.corsType,
                x = a.corsSrc,
                p = a.corsInstance,
                l = a.corsPostData,
                s = a.postCallbackFn,
                n = "function" == typeof s;
            if (!k.abortRequests) {
                if (k.firing = !0, M) k.firing = !1;
                else try {
                    p.open("post", x, !0), "XMLHttpRequest" === m ? (p.withCredentials = !0, p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), p.onreadystatechange = function() {
                        4 === this.readyState && (200 === this.status ? g(this.responseText) : h.handleCORSError(a, c, "onreadystatechange"))
                    }) : "XDomainRequest" === m && (p.onload = function() {
                        g(this.responseText)
                    }), p.onerror = function() {
                        h.handleCORSError(a, c, "onerror")
                    }, p.ontimeout = function() {
                        h.handleCORSError(a, c, "ontimeout")
                    }, p.send(l)
                } catch (u) {
                    this.handleCORSError(a, c, "try-catch")
                }
                k.sent.push(a), k.declaredId.declaredId.request = null
            }
        },
        handleCORSError: function(a, b, c) {
            a.hasCORSError || (a.hasCORSError = !0, q.num_of_cors_errors++, q.corsErrorSources.push(c), a.tag = "script", this.fireScript(a, b))
        },
        handleScriptError: function(a, b) {
            q.num_of_jsonp_errors++, this.handleRequestError(a, b)
        },
        handleRequestError: function(a, b) {
            var c = q;
            d.push(a), c.abortRequests = !0, c.firing = !1, c.errored.push(b), c.registerRequest()
        }
    }, w = {
        isValidPdata: function(a) {
            return !!(a instanceof Array && this.removeEmptyArrayValues(a).length)
        },
        isValidLogdata: function(a) {
            return !this.isEmptyObject(a)
        },
        isEmptyObject: function(a) {
            if (a !== Object(a)) return !0;
            for (var b in a) if (a.hasOwnProperty(b)) return !1;
            return !0
        },
        removeEmptyArrayValues: function(a) {
            for (var d, b = 0, c = a.length, f = [], b = 0; b < c; b++) d = a[b], "undefined" != typeof d && null !== d && "" !== d && f.push(d);
            return f
        },
        isPopulatedString: function(a) {
            return "string" == typeof a && a.length
        }
    }, v = {
        addListener: function() {
            return document.addEventListener ? function(a, b, c) {
                a.addEventListener(b, function(a) {
                    "function" == typeof c && c(a)
                }, !1)
            } : document.attachEvent ? function(a, b, c) {
                a.attachEvent("on" + b, function(a) {
                    "function" == typeof c && c(a)
                })
            } : void 0
        }(),
        convertObjectToKeyValuePairs: function(a, b, c) {
            var f, g, d = [];
            b || (b = "=");
            for (f in a) a.hasOwnProperty(f) && (g = a[f], "undefined" != typeof g && null !== g && "" !== g && d.push(f + b + (c ? encodeURIComponent(g) : g)));
            return d
        },
        encodeAndBuildRequest: function(a, b) {
            return this.map(a, function(a) {
                return encodeURIComponent(a)
            }).join(b)
        },
        map: function(a, b) {
            if (Array.prototype.map) return a.map(b);
            if (void 0 === a || null === a) throw new TypeError;
            var c = Object(a),
                d = c.length >>> 0;
            if ("function" != typeof b) throw new TypeError;
            for (var f = Array(d), g = 0; g < d; g++) g in c && (f[g] = b.call(b, c[g], g, c));
            return f
        },
        filter: function(a, b) {
            if (!Array.prototype.filter) {
                if (void 0 === a || null === a) throw new TypeError;
                var c = Object(a),
                    d = c.length >>> 0;
                if ("function" != typeof b) throw new TypeError;
                for (var g = [], f = 0; f < d; f++) if (f in c) {
                    var k = c[f];
                    b.call(b, k, f, c) && g.push(k)
                }
                return g
            }
            return a.filter(b)
        },
        getCookie: function(a) {
            a += "=";
            var c, d, f, b = document.cookie.split(";");
            for (c = 0, d = b.length; c < d; c++) {
                for (f = b[c];
                " " === f.charAt(0);) f = f.substring(1, f.length);
                if (0 === f.indexOf(a)) return decodeURIComponent(f.substring(a.length, f.length))
            }
            return null
        },
        setCookie: function(a, b, c, d, f, g) {
            var k = new Date;
            c && (c *= 6e4), document.cookie = a + "=" + encodeURIComponent(b) + (c ? ";expires=" + new Date(k.getTime() + c).toUTCString() : "") + (d ? ";path=" + d : "") + (f ? ";domain=" + f : "") + (g ? ";secure" : "")
        },
        extendArray: function(a, b) {
            return a instanceof Array && b instanceof Array && (Array.prototype.push.apply(a, b), !0)
        },
        extendObject: function(a, b, c) {
            var d;
            if (a === Object(a) && b === Object(b)) {
                for (d in b)!b.hasOwnProperty(d) || !w.isEmptyObject(c) && d in c || (a[d] = b[d]);
                return !0
            }
            return !1
        },
        getMaxCookieExpiresInMinutes: function() {
            return (new Date(B.COOKIE_MAX_EXPIRATION_DATE).getTime() - (new Date).getTime()) / 1e3 / 60
        }
    };
    "error" === f && 0 === k && v.addListener(window, "load", function() {
        DIL.windowLoaded = !0
    });
    var S = !1,
        F = function() {
            S || (S = !0, q.registerRequest(), U(), n || q.abortRequests || z.attachIframe(), q.readyToRemove = !0, q.requestRemoval())
        }, U = function() {
            n || setTimeout(function() {
                N || q.firstRequestHasFired || ("function" == typeof G ? I.afterResult(G).submit() : I.submit())
            }, DIL.constants.TIME_TO_DEFAULT_REQUEST)
        }, T = document;
    "error" !== f && (DIL.windowLoaded ? F() : "complete" !== T.readyState && "loaded" !== T.readyState ? v.addListener(window, "load", function() {
        DIL.windowLoaded = !0, F()
    }) : (DIL.windowLoaded = !0, F())), q.declaredId.setDeclaredId(x, "init"), q.processVisitorAPI(), this.api = I, this.getStuffedVariable = function(a) {
        var b = H.stuffed[a];
        return b || "number" == typeof b || (b = v.getCookie(a)) || "number" == typeof b || (b = ""), b
    }, this.validators = w, this.helpers = v, this.constants = B, this.log = d, R && (this.pendingRequest = l, this.requestController = q, this.setDestinationPublishingUrl = g, this.destinationPublishing = z, this.requestProcs = C, this.variables = H, this.callWindowLoadFunctions = F)
}, function() {
    var c, a = document;
    null == a.readyState && a.addEventListener && (a.readyState = "loading", a.addEventListener("DOMContentLoaded", c = function() {
        a.removeEventListener("DOMContentLoaded", c, !1), a.readyState = "complete"
    }, !1))
}(), DIL.extendStaticPropertiesAndMethods = function(a) {
    var c;
    if (a === Object(a)) for (c in a) a.hasOwnProperty(c) && (this[c] = a[c])
}, DIL.extendStaticPropertiesAndMethods({
    version: "6.2",
    jsonVersion: 1,
    constants: {
        TIME_TO_DEFAULT_REQUEST: 50
    },
    variables: {
        scriptNodeList: document.getElementsByTagName("script"),
        scriptsRemoved: [],
        callbacksRemoved: []
    },
    windowLoaded: !1,
    dils: {},
    isAddedPostWindowLoad: function(a) {
        this.windowLoaded = "function" == typeof a ? !! a() : "boolean" != typeof a || a
    },
    create: function(a) {
        try {
            return new DIL(a)
        } catch (c) {
            return new Image(0, 0).src = "http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D" + (new Date).getTime(), Error("Error in attempt to create DIL instance with DIL.create()")
        }
    },
    registerDil: function(a, c, d) {
        c = c + "$" + d, c in this.dils || (this.dils[c] = a)
    },
    getDil: function(a, c) {
        var d;
        return "string" != typeof a && (a = ""), c || (c = 0), d = a + "$" + c, d in this.dils ? this.dils[d] : Error("The DIL instance with partner = " + a + " and containerNSID = " + c + " was not found")
    },
    dexGetQSVars: function(a, c, d) {
        return c = this.getDil(c, d), c instanceof this ? c.getStuffedVariable(a) : ""
    },
    xd: {
        postMessage: function(a, c, d) {
            var b = 1;
            c && (window.postMessage ? d.postMessage(a, c.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : c && (d.location = c.replace(/#.*$/, "") + "#" + +new Date + b+++"&" + a))
        }
    }
}), DIL.errorModule = function() {
    var a = DIL.create({
        partner: "error",
        containerNSID: 0,
        disableDestinationPublishingIframe: !0
    }),
        c = {
            harvestererror: 14138,
            destpuberror: 14139,
            dpmerror: 14140,
            generalerror: 14137,
            error: 14137,
            noerrortypedefined: 15021,
            evalerror: 15016,
            rangeerror: 15017,
            referenceerror: 15018,
            typeerror: 15019,
            urierror: 15020
        }, d = !1;
    return {
        activate: function() {
            d = !0
        },
        handleError: function(b) {
            if (!d) return "DIL error module has not been activated";
            b !== Object(b) && (b = {});
            var g = b.name ? (b.name + "").toLowerCase() : "",
                f = [];
            return b = {
                name: g,
                filename: b.filename ? b.filename + "" : "",
                partner: b.partner ? b.partner + "" : "no_partner",
                site: b.site ? b.site + "" : document.location.href,
                message: b.message ? b.message + "" : ""
            }, f.push(g in c ? c[g] : c.noerrortypedefined), a.api.pixels(f).logs(b).useImageRequest().submit(), "DIL error report sent"
        },
        pixelMap: c
    }
}(), DIL.tools = {}, DIL.modules = {
    helpers: {
        handleModuleError: function(a, c, d) {
            var b = "";
            return c = c || "Error caught in DIL module/submodule: ", a === Object(a) ? b = c + (a.message || "err has no message") : (b = c + "err is not a valid object", a = {}), a.message = b, d instanceof DIL && (a.partner = d.api.getPartner()), DIL.errorModule.handleError(a), this.errorMessage = b
        }
    }
}), DIL.tools.getSearchReferrer = function(a, c) {
    var d = DIL.getDil("error"),
        b = DIL.tools.decomposeURI(a || document.referrer),
        g = "",
        f = "",
        k = {
            queryParam: "q"
        };
    return (g = d.helpers.filter([c === Object(c) ? c : {}, {
        hostPattern: /aol\./
    }, {
        hostPattern: /ask\./
    }, {
        hostPattern: /bing\./
    }, {
        hostPattern: /google\./
    }, {
        hostPattern: /yahoo\./,
        queryParam: "p"
    }], function(a) {
        return !(!a.hasOwnProperty("hostPattern") || !b.hostname.match(a.hostPattern))
    }).shift()) ? {
        valid: !0,
        name: b.hostname,
        keywords: (d.helpers.extendObject(k, g), f = k.queryPattern ? (g = ("" + b.search).match(k.queryPattern)) ? g[1] : "" : b.uriParams[k.queryParam], decodeURIComponent(f || "").replace(/\+|%20/g, " "))
    } : {
        valid: !1,
        name: "",
        keywords: ""
    }
}, DIL.tools.decomposeURI = function(a) {
    var c = DIL.getDil("error"),
        d = document.createElement("a");
    return d.href = a || document.referrer, {
        hash: d.hash,
        host: d.host.split(":").shift(),
        hostname: d.hostname,
        href: d.href,
        pathname: d.pathname.replace(/^\//, ""),
        protocol: d.protocol,
        search: d.search,
        uriParams: function(a, d) {
            return c.helpers.map(d.split("&"), function(c) {
                c = c.split("="), a[c.shift()] = c.shift()
            }), a
        }({}, d.search.replace(/^(\/|\?)?|\/$/g, ""))
    }
}, DIL.tools.getMetaTags = function() {
    var d, b, g, f, k, a = {}, c = document.getElementsByTagName("meta");
    for (d = 0, g = arguments.length; d < g; d++) if (f = arguments[d], null !== f) for (b = 0; b < c.length; b++) if (k = c[b], k.name === f) {
        a[f] = k.content;
        break
    }
    return a
}, DIL.modules.siteCatalyst = {
    dil: null,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, d, b) {
        try {
            var g = this,
                f = {
                    name: "DIL Site Catalyst Module Error"
                }, k = function(a) {
                    return f.message = a, DIL.errorModule.handleError(f), a
                };
            return this.options = b === Object(b) ? b : {}, this.dil = null, c instanceof DIL ? (this.dil = c, f.partner = c.api.getPartner(), a !== Object(a) ? k("siteCatalystReportingSuite is not an object") : (window.AppMeasurement_Module_DIL = a.m_DIL = function(a) {
                var b = "function" == typeof a.m_i ? a.m_i("DIL") : this;
                return b !== Object(b) ? k("m is not an object") : (b.trackVars = g.constructTrackVars(d), b.d = 0, b.s = a, void(b._t = function() {
                    var a, b, f, c = "," + this.trackVars + ",",
                        d = this.s,
                        s = [];
                    f = [];
                    var n = {}, u = !1;
                    if (d !== Object(d)) return k("Error in m._t function: s is not an object");
                    if (this.d) {
                        if ("function" == typeof d.foreachVar) d.foreachVar(function(a, b) {
                            "undefined" != typeof b && (n[a] = b, u = !0)
                        }, this.trackVars);
                        else {
                            if (!(d.va_t instanceof Array)) return k("Error in m._t function: s.va_t is not an array");
                            if (d.lightProfileID ? (a = d.lightTrackVars) && (a = "," + a + "," + d.vl_mr + ",") : (d.pe || d.linkType) && (a = d.linkTrackVars, d.pe && (b = d.pe.substring(0, 1).toUpperCase() + d.pe.substring(1), d[b] && (a = d[b].trackVars)), a && (a = "," + a + "," + d.vl_l + "," + d.vl_l2 + ",")), a) {
                                for (b = 0, s = a.split(","); b < s.length; b++) 0 <= c.indexOf("," + s[b] + ",") && f.push(s[b]);
                                f.length && (c = "," + f.join(",") + ",")
                            }
                            for (f = 0, b = d.va_t.length; f < b; f++) a = d.va_t[f], 0 <= c.indexOf("," + a + ",") && "undefined" != typeof d[a] && null !== d[a] && "" !== d[a] && (n[a] = d[a], u = !0)
                        }
                        g.includeContextData(d, n).store_populated && (u = !0), u && this.d.api.signals(n, "c_").submit()
                    }
                }))
            }, a.loadModule("DIL"), a.DIL.d = c, f.message ? f.message : "DIL.modules.siteCatalyst.init() completed with no errors")) : k("dilInstance is not a valid instance of DIL")
        } catch (n) {
            return this.handle(n, "DIL.modules.siteCatalyst.init() caught error with message ", this.dil)
        }
    },
    constructTrackVars: function(a) {
        var d, b, g, f, k, c = [];
        if (a === Object(a)) {
            if (d = a.names, d instanceof Array && (g = d.length)) for (b = 0; b < g; b++) f = d[b], "string" == typeof f && f.length && c.push(f);
            if (a = a.iteratedNames, a instanceof Array && (g = a.length)) for (b = 0; b < g; b++) if (d = a[b], d === Object(d) && (f = d.name, k = parseInt(d.maxIndex, 10), "string" == typeof f && f.length && !isNaN(k) && 0 <= k)) for (d = 0; d <= k; d++) c.push(f + d);
            if (c.length) return c.join(",")
        }
        return this.constructTrackVars({
            names: "pageName channel campaign products events pe pev1 pev2 pev3".split(" "),
            iteratedNames: [{
                name: "prop",
                maxIndex: 75
            }, {
                name: "eVar",
                maxIndex: 250
            }]
        })
    },
    includeContextData: function(a, c) {
        var d = {}, b = !1;
        if (a.contextData === Object(a.contextData)) {
            var u, s, m, p, g = a.contextData,
                f = this.options.replaceContextDataPeriodsWith,
                k = this.options.filterFromContextVariables,
                n = {};
            if ("string" == typeof f && f.length || (f = "_"), k instanceof Array) for (u = 0, s = k.length; u < s; u++) m = k[u], this.dil.validators.isPopulatedString(m) && (n[m] = !0);
            for (p in g)!g.hasOwnProperty(p) || n[p] || !(k = g[p]) && "number" != typeof k || (p = ("contextData." + p).replace(/\./g, f), c[p] = k, b = !0)
        }
        return d.store_populated = b, d
    }
}, DIL.modules.GA = {
    dil: null,
    arr: null,
    tv: null,
    errorMessage: "",
    defaultTrackVars: ["_setAccount", "_setCustomVar", "_addItem", "_addTrans", "_trackSocial"],
    defaultTrackVarsObj: null,
    signals: {},
    hasSignals: !1,
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, d) {
        try {
            this.tv = this.arr = this.dil = null, this.errorMessage = "", this.signals = {}, this.hasSignals = !1;
            var b = {
                name: "DIL GA Module Error"
            }, g = "";
            c instanceof DIL ? (this.dil = c, b.partner = this.dil.api.getPartner()) : (g = "dilInstance is not a valid instance of DIL", b.message = g, DIL.errorModule.handleError(b)), a instanceof Array && a.length ? this.arr = a : (g = "gaArray is not an array or is empty", b.message = g, DIL.errorModule.handleError(b)), this.tv = this.constructTrackVars(d), this.errorMessage = g
        } catch (f) {
            this.handle(f, "DIL.modules.GA.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    constructTrackVars: function(a) {
        var d, b, g, f, c = [];
        if (this.defaultTrackVarsObj !== Object(this.defaultTrackVarsObj)) {
            for (g = this.defaultTrackVars, f = {}, d = 0, b = g.length; d < b; d++) f[g[d]] = !0;
            this.defaultTrackVarsObj = f
        } else f = this.defaultTrackVarsObj;
        if (a === Object(a)) {
            if (a = a.names, a instanceof Array && (b = a.length)) for (d = 0; d < b; d++) g = a[d], "string" == typeof g && g.length && g in f && c.push(g);
            if (c.length) return c
        }
        return this.defaultTrackVars
    },
    constructGAObj: function(a) {
        var c = {};
        a = a instanceof Array ? a : this.arr;
        var d, b, g, f;
        for (d = 0, b = a.length; d < b; d++) g = a[d], g instanceof Array && g.length && (g = [], f = a[d], g instanceof Array && f instanceof Array && Array.prototype.push.apply(g, f), f = g.shift(), "string" == typeof f && f.length && (c[f] instanceof Array || (c[f] = []), c[f].push(g)));
        return c
    },
    addToSignals: function(a, c) {
        return "string" == typeof a && "" !== a && null != c && "" !== c && (this.signals[a] instanceof Array || (this.signals[a] = []), this.signals[a].push(c), this.hasSignals = !0)
    },
    constructSignals: function() {
        var b, g, f, k, n, u, a = this.constructGAObj(),
            c = {
                _setAccount: function(a) {
                    this.addToSignals("c_accountId", a)
                },
                _setCustomVar: function(a, b, c) {
                    "string" == typeof b && b.length && this.addToSignals("c_" + b, c)
                },
                _addItem: function(a, b, c, d, f, g) {
                    this.addToSignals("c_itemOrderId", a), this.addToSignals("c_itemSku", b), this.addToSignals("c_itemName", c), this.addToSignals("c_itemCategory", d), this.addToSignals("c_itemPrice", f), this.addToSignals("c_itemQuantity", g)
                },
                _addTrans: function(a, b, c, d, f, g, k, n) {
                    this.addToSignals("c_transOrderId", a), this.addToSignals("c_transAffiliation", b), this.addToSignals("c_transTotal", c), this.addToSignals("c_transTax", d), this.addToSignals("c_transShipping", f), this.addToSignals("c_transCity", g), this.addToSignals("c_transState", k), this.addToSignals("c_transCountry", n)
                },
                _trackSocial: function(a, b, c, d) {
                    this.addToSignals("c_socialNetwork", a), this.addToSignals("c_socialAction", b), this.addToSignals("c_socialTarget", c), this.addToSignals("c_socialPagePath", d)
                }
            }, d = this.tv;
        for (b = 0, g = d.length; b < g; b++) if (f = d[b], a.hasOwnProperty(f) && c.hasOwnProperty(f) && (u = a[f], u instanceof Array)) for (k = 0, n = u.length; k < n; k++) c[f].apply(this, u[k])
    },
    submit: function() {
        try {
            return "" !== this.errorMessage ? this.errorMessage : (this.constructSignals(), this.hasSignals ? (this.dil.api.signals(this.signals).submit(), "Signals sent: " + this.dil.helpers.convertObjectToKeyValuePairs(this.signals, "=", !0) + this.dil.log) : "No signals present")
        } catch (a) {
            return this.handle(a, "DIL.modules.GA.submit() caught error with message ", this.dil)
        }
    },
    Stuffer: {
        LIMIT: 5,
        dil: null,
        cookieName: null,
        delimiter: null,
        errorMessage: "",
        handle: DIL.modules.helpers.handleModuleError,
        callback: null,
        v: function() {
            return !1
        },
        init: function(a, c, d) {
            try {
                this.callback = this.dil = null, this.errorMessage = "", a instanceof DIL ? (this.dil = a, this.v = this.dil.validators.isPopulatedString, this.cookieName = this.v(c) ? c : "aam_ga", this.delimiter = this.v(d) ? d : "|") : this.handle({
                    message: "dilInstance is not a valid instance of DIL"
                }, "DIL.modules.GA.Stuffer.init() error: ")
            } catch (b) {
                this.handle(b, "DIL.modules.GA.Stuffer.init() caught error with message ", this.dil)
            } finally {
                return this
            }
        },
        process: function(a) {
            var c, d, b, g, f, k;
            k = !1;
            var n = 1;
            if (a === Object(a) && (c = a.stuff) && c instanceof Array && (d = c.length)) for (a = 0; a < d; a++) if ((b = c[a]) && b === Object(b) && (g = b.cn, f = b.cv, g === this.cookieName && this.v(f))) {
                k = !0;
                break
            }
            if (k) {
                for (c = f.split(this.delimiter), "undefined" == typeof window._gaq && (window._gaq = []), b = window._gaq, a = 0, d = c.length; a < d && (k = c[a].split("="), f = k[0], k = k[1], this.v(f) && this.v(k) && b.push(["_setCustomVar", n++, f, k, 1]), !(n > this.LIMIT)); a++);
                this.errorMessage = 1 < n ? "No errors - stuffing successful" : "No valid values to stuff"
            } else this.errorMessage = "Cookie name and value not found in json";
            if ("function" == typeof this.callback) return this.callback()
        },
        submit: function() {
            try {
                var a = this;
                return "" !== this.errorMessage ? this.errorMessage : (this.dil.api.afterResult(function(c) {
                    a.process(c)
                }).submit(), "DIL.modules.GA.Stuffer.submit() successful")
            } catch (c) {
                return this.handle(c, "DIL.modules.GA.Stuffer.submit() caught error with message ", this.dil)
            }
        }
    }
}, DIL.modules.Peer39 = {
    aid: "",
    dil: null,
    optionals: null,
    errorMessage: "",
    calledBack: !1,
    script: null,
    scriptsSent: [],
    returnedData: [],
    handle: DIL.modules.helpers.handleModuleError,
    init: function(a, c, d) {
        try {
            this.dil = null, this.errorMessage = "", this.calledBack = !1, this.optionals = d === Object(d) ? d : {}, d = {
                name: "DIL Peer39 Module Error"
            };
            var b = [],
                g = "";
            this.isSecurePageButNotEnabled(document.location.protocol) && (g = "Module has not been enabled for a secure page", b.push(g), d.message = g, DIL.errorModule.handleError(d)), c instanceof DIL ? (this.dil = c, d.partner = this.dil.api.getPartner()) : (g = "dilInstance is not a valid instance of DIL", b.push(g), d.message = g, DIL.errorModule.handleError(d)), "string" == typeof a && a.length ? this.aid = a : (g = "aid is not a string or is empty", b.push(g), d.message = g, DIL.errorModule.handleError(d)), this.errorMessage = b.join("\n")
        } catch (f) {
            this.handle(f, "DIL.modules.Peer39.init() caught error with message ", this.dil)
        } finally {
            return this
        }
    },
    isSecurePageButNotEnabled: function(a) {
        return "https:" === a && !0 !== this.optionals.enableHTTPS
    },
    constructSignals: function() {
        var a = this,
            c = this.constructScript(),
            d = DIL.variables.scriptNodeList[0];
        return window["afterFinished_" + this.aid] = function() {
            try {
                var b = a.processData(p39_KVP_Short("c_p", "|").split("|"));
                b.hasSignals && a.dil.api.signals(b.signals).submit()
            } catch (c) {} finally {
                a.calledBack = !0, "function" == typeof a.optionals.afterResult && a.optionals.afterResult()
            }
        }, d.parentNode.insertBefore(c, d), this.scriptsSent.push(c), "Request sent to Peer39"
    },
    processData: function(a) {
        var c, d, b, g, f = {}, k = !1;
        if (this.returnedData.push(a), a instanceof Array) for (c = 0, d = a.length; c < d; c++) b = a[c].split("="), g = b[0], b = b[1], g && isFinite(b) && !isNaN(parseInt(b, 10)) && (f[g] instanceof Array || (f[g] = []), f[g].push(b), k = !0);
        return {
            hasSignals: k,
            signals: f
        }
    },
    constructScript: function() {
        var a = document.createElement("script"),
            c = this.optionals,
            d = c.scriptId,
            b = c.scriptSrc,
            c = c.scriptParams;
        return a.id = "string" == typeof d && d.length ? d : "peer39ScriptLoader", a.type = "text/javascript", "string" == typeof b && b.length ? a.src = b : (a.src = (this.dil.constants.IS_HTTPS ? "https:" : "http:") + "//stags.peer39.net/" + this.aid + "/trg_" + this.aid + ".js", "string" == typeof c && c.length && (a.src += "?" + c)), a
    },
    submit: function() {
        try {
            return "" !== this.errorMessage ? this.errorMessage : this.constructSignals()
        } catch (a) {
            return this.handle(a, "DIL.modules.Peer39.submit() caught error with message ", this.dil)
        }
    }
};
var c_name = "ACST",
    idSync = DILgetCookie(c_name),
    kddiDil = DIL.create({
        partner: "kddi",
        containerNSID: 0,
        uuidCookie: {
            name: "aam_id",
            days: 30
        }
    });
idSync && kddiDil.api.aamIdSync({
    dpid: "10909",
    dpuuid: idSync,
    minutesToLive: 20160
}), window.dil_data_obj = {}, dil_data_obj.site = "auonejp", dil_data_obj.pathname = window.location.pathname, dil_data_obj.host = window.location.host, window.location.search && (dil_data_obj.search = window.location.search), document.referrer && (dil_data_obj.referrer = document.referrer);
var dil_date = new Date;
dil_data_obj.date = dil_date.getFullYear() + "/" + DIL_ZeroFormat(dil_date.getMonth(), 2) + "/" + DIL_ZeroFormat(dil_date.getDate(), 2), kddiDil.api.signals(dil_data_obj, "c_data_");
var PortalAd = {};
PortalAd.baseDomain = "adc.medibaad.com", PortalAd.idsettings = function() {
    return {
        xid: void 0,
        fq: void 0
    }
}(), PortalAd.utils = function() {
    function _isIOS() {
        return _ua.indexOf("ipod") > -1 || _ua.indexOf("iphone") > -1 || _ua.indexOf("ipad") > -1
    }
    function _isAndroid() {
        return _ua.indexOf("android") > -1
    }
    function _isTablet() {
        var ret = _ua.indexOf("ipad") > -1;
        return ret || (ret = _ua.indexOf("android") > -1 && _ua.indexOf("mobile") < 0), ret || (ret = _ua.indexOf("sc-01c") > -1), ret || (ret = _ua.indexOf("sc-02d") > -1), ret
    }
    function _lowerAndroid(n) {
        if (_ua.indexOf("android") == -1) return !1;
        var version = parseFloat(_ua.substr(_ua.indexOf("android") + 8, 3));
        return version < n
    }
    function _lowerIPhone(n) {
        if (_ua.indexOf("iphone") == -1) return !1;
        var versionStr = _ua.substr(_ua.indexOf("os ") + 3, 3),
            version = parseFloat(versionStr.replace("_", "."));
        return version < n
    }
    var _ua = window.navigator.userAgent.toLowerCase();
    return {
        isIOS: _isIOS,
        isAndroid: _isAndroid,
        isTablet: _isTablet,
        lowerAndroid: _lowerAndroid,
        lowerIPhone: _lowerIPhone
    }
}(), PortalAd.settings = function() {
    return {
        adcDomain: PortalAd.baseDomain,
        getAdUrl: location.protocol + "//" + PortalAd.baseDomain + "/sadr/1.0/",
        firstLoad: !0,
        idLoaded: !1,
        idLoadAborted: !1,
        metaCheckCount: 0,
        adPopup: {},
        inlineLP: !1,
        islowerAndroid4: PortalAd.utils.lowerAndroid(4)
    }
}(), PortalAd.initializer = function() {
    function _init() {
        PortalAd.settings.idLoaded = !0, PortalAd.settings.idLoadAborted = !0
    }
    location.protocol + "//" + PortalAd.baseDomain;
    return {
        init: _init
    }
}(), PortalAd.initializer.callback = function(data) {
    data.xid && (PortalAd.idsettings.xid = data.xid), data.fq && (PortalAd.idsettings.fq = data.fq), PortalAd.settings.idLoaded = !0, PortalAd.settings.firstLoad = !1
},
function() {
    PortalAd.initializer.init()
}();
var PortalSide = {};
PortalSide.adset = {
    ads: [{
        auid: window.global.adAuid.side,
        addivid: "sidemenu__ad-box",
        formatType: "json"
    }]
}, PortalSide.loader = function() {
    function _init() {
        if (PortalAd.settings.idLoaded === !1) setTimeout(function() {
            _init()
        }, 20);
        else {
            1 == arguments.length ? arguments[0] : {};
            if ("undefined" != typeof PortalSide.adset) for (var i = 0; i < PortalSide.adset.ads.length; i++) ad = new MedibaAdPortalClient(PortalSide.adset.ads[i], PortalAd.idsettings), _run();
            else console.log("Missing adset Object!")
        }
    }
    function _run() {
        var xhr = new XMLHttpRequest,
            url = ad.getAdRequestURL();
        xhr.async = !1, xhr.open("GET", url, !0), xhr.onreadystatechange = function() {
            if (4 === xhr.readyState && (200 <= xhr.status && xhr.status < 300 || 304 == xhr.status)) try {
                var data = JSON.parse(xhr.responseText);
                PortalSide.loader.callback(data)
            } catch (e) {
                console.error(e)
            }
        }, xhr.send(null)
    }
    var ad = void 0;
    return {
        init: _init,
        call: _run
    }
}(), PortalSide.loader.callback = function(json) {
    if (void 0 !== json && void 0 !== json.html) {
        var html = decodeURIComponent(json.html);
        elem = document.getElementById(PortalSide.adset.ads[0].addivid), elem.innerHTML = html
    }
}; 


function lottery() {
    $.ajax({
        type          : 'GET',
        dataType      : 'jsonp', //'html',
        jsonpCallback : 'gacha',
        cache         : false,
        timeout       : 4000,
        url           : gachaApiURL + '/gacha/result',
        success       : function(data, dataType) {
            result.data = data;
            if(true) {
                if(true) {
                    if(true) {
                        if(true) {
                            
                        }
                    }
                }
            }
            if (result.data['rank'] == -1) {
                location.href = baseURL + '/gacha';
            } else if(result.data['rank'] > 0) {
                result.win = true;
                $('#gacha').prepend('<div class="result_bg win"></div>');
            //はずれ
            } else {
                if (result.data['status'] == 3) {
                    location.href = baseURL + '/gacha/retry';
                } else {
                    result.win = false;
                    $('#gacha').prepend('<div class="result_bg lose_b"></div>');
                }
            }
            rotateBolt(360);

        },
        error         : function(XMLHttpRequest, textStatus, errorThrown) {
            location.href = baseURL + '/gacha/retry';
        },
    });
}