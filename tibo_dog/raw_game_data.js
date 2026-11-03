<USER_REQUEST>
const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["./ru-BOIn86ps.css", "./mr-OO-b547B.css", "./gilded-vi-YdHlKjYc.css", "./te-DUXazoJr.css", "./ta-Cto6NbKr.css", "./bn-CluZLuO8.css", "./th-KkiyXR_1.css", "./ha-Cgks5ODK.css", "./ar-BVPgh3hk.css", "./he-BF9wWoM8.css", "./ur-B9jDG-uh.css", "./gilded-latin-ext-KSK6ozs2.css", "./rtl-_7sXhlbK.css"]))) => i.map(i => d[i]);
var e = e => typeof e == `string`
  , t = e => typeof e == `function`
  , n = new Map;
function r(e) {
    return [...Array.isArray(e) ? e : [e], `en`]
}
function i(t, n, i) {
    let a = r(t), o;
    if (i ||= `default`,
    typeof i == `string`)
        switch (o = {
            day: `numeric`,
            month: `short`,
            year: `numeric`
        },
        i) {
        case `full`:
            o.weekday = `long`;
        case `long`:
            o.month = `long`;
            break;
        case `short`:
            o.month = `numeric`
        }
    else
        o = i;
    return s( () => c(`date`, a, i), () => new Intl.DateTimeFormat(a,o)).format(e(n) ? new Date(n) : n)
}
function a(e, t, n) {
    let i = r(e);
    return s( () => c(`number`, i, n), () => new Intl.NumberFormat(i,n)).format(t)
}
function o(e, t, n, {offset: i=0, ...a}) {
    let o = r(e)
      , l = t ? s( () => c(`plural-ordinal`, o), () => new Intl.PluralRules(o,{
        type: `ordinal`
    })) : s( () => c(`plural-cardinal`, o), () => new Intl.PluralRules(o,{
        type: `cardinal`
    }));
    return a[n] ?? a[l.select(n - i)] ?? a.other
}
function s(e, t) {
    let r = e()
      , i = n.get(r);
    return i || (i = t(),
    n.set(r, i)),
    i
}
function c(e, t, n) {
    return `${e}-${t.join(`-`)}-${JSON.stringify(n)}`
}
var l = /\\u[a-fA-F0-9]{4}|\\x[a-fA-F0-9]{2}/
  , u = e => e.replace(/\\u([a-fA-F0-9]{4})|\\x([a-fA-F0-9]{2})/g, (e, t, n) => {
    if (t) {
        let e = parseInt(t, 16);
        return String.fromCharCode(e)
    }
    {
        let e = parseInt(n, 16);
        return String.fromCharCode(e)
    }
}
)
  , d = `%__lingui_octothorpe__%`
  , f = (e, t) => (Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0) ?? t.other
  , p = class {
    _events = {};
    on(e, t) {
        return this._events[e] ??= new Set,
        this._events[e].add(t),
        () => this.removeListener(e, t)
    }
    removeListener(e, t) {
        let n = this._events[e];
        n?.delete(t),
        n?.size === 0 && delete this._events[e]
    }
    emit(e, ...t) {
        let n = this._events[e];
        if (n)
            for (let e of [...n])
                e.apply(this, t)
    }
}
  , m = class extends p {
    _locale = ``;
    _locales;
    _messages = {};
    _variables = {};
    _missing;
    _messageCompiler;
    constructor(e) {
        super(),
        e.missing != null && (this._missing = e.missing),
        e.messages != null && this.load(e.messages),
        e.variables != null && (this._variables = {
            ...e.variables
        }),
        (typeof e.locale == `string` || e.locales) && this.activate(e.locale ?? `en`, e.locales)
    }
    get locale() {
        return this._locale
    }
    get locales() {
        return this._locales
    }
    get messages() {
        return this._messages[this._locale] ?? {}
    }
    get variables() {
        return this._variables
    }
    setVariable(e, t) {
        return t === void 0 ? delete this._variables[e] : this._variables[e] = t,
        this.emit(`change`),
        this
    }
    setVariables(e) {
        return this._variables = {
            ...t(e) ? e(this._variables) : e
        },
        this.emit(`change`),
        this
    }
    setMessagesCompiler(e) {
        return this._messageCompiler = e,
        this
    }
    _load(e, t) {
        let n = Object.prototype.hasOwnProperty.call(this._messages, e) ? this._messages[e] : void 0;
        n ? Object.assign(n, t) : this._messages[e] = t
    }
    load(e, t) {
        typeof e == `string` && typeof t == `object` ? this._load(e, t) : Object.entries(e).forEach( ([e,t]) => this._load(e, t)),
        this.emit(`change`)
    }
    loadAndActivate({locale: e, locales: t, messages: n}) {
        this._locale = e,
        this._locales = t || void 0,
        this._messages[this._locale] = n,
        this.emit(`change`)
    }
    activate(e, t) {
        this._locale = e,
        this._locales = t,
        this.emit(`change`)
    }
    _(n, r, s) {
        if (!this.locale)
            throw Error(`Lingui: Attempted to call a translation function without setting a locale.
Make sure to call \`i18n.activate(locale)\` before using Lingui functions.
This issue may also occur due to a race condition in your initialization logic.`);
        let c = s?.message;
        n ||= ``,
        e(n) || (r = n.values || r,
        c = n.message,
        n = n.id);
        let p = this.messages
          , m = Object.prototype.hasOwnProperty.call(p, n) ? p[n] : void 0
          , h = m === void 0
          , g = this._missing;
        if (g && h)
            return t(g) ? g(this._locale, n) : g;
        h && this.emit(`missing`, {
            id: n,
            locale: this._locale
        });
        let _ = m || c || n;
        return e(_) && this._messageCompiler && (_ = this._messageCompiler(_)),
        e(_) && l.test(_) ? u(_) : e(_) ? _ : function(n, r, s) {
            return (c={}, p, m) => {
                let h = ( (e, t, n={}) => {
                    let r = t || e
                      , s = e => typeof e == `object` ? e : n[e]
                      , c = (e, t) => {
                        let i = Object.keys(n).length ? s(`number`) : void 0
                          , o = a(r, e, i);
                        return t.replace(new RegExp(d,`g`), o)
                    }
                    ;
                    return {
                        plural: (e, t) => {
                            let {offset: n=0} = t
                              , i = o(r, !1, e, t);
                            return c(e - n, i)
                        }
                        ,
                        selectordinal: (e, t) => {
                            let {offset: n=0} = t
                              , i = o(r, !0, e, t);
                            return c(e - n, i)
                        }
                        ,
                        select: f,
                        number: (e, t) => a(r, e, s(t) || {
                            style: t
                        }),
                        date: (e, t) => i(r, e, s(t) || t),
                        time: (e, t) => function(e, t, n) {
                            let r;
                            if (n ||= `default`,
                            typeof n == `string`)
                                switch (r = {
                                    second: `numeric`,
                                    minute: `numeric`,
                                    hour: `numeric`
                                },
                                n) {
                                case `full`:
                                case `long`:
                                    r.timeZoneName = `short`;
                                    break;
                                case `short`:
                                    delete r.second
                                }
                            else
                                r = n;
                            return i(e, t, r)
                        }(r, e, s(t) || t)
                    }
                }
                )(r, s, p)
                  , g = e => {
                    let n = m?.[e];
                    return c[e] ?? (t(n) ? n() : n)
                }
                  , _ = (t, n=!1) => Array.isArray(t) ? t.reduce( (t, r) => {
                    if (r === `#` && n)
                        return t + d;
                    if (e(r))
                        return t + r;
                    let[i,a,o] = r, s, c = {};
                    return a === `plural` || a === `selectordinal` || a === `select` ? Object.entries(o).forEach( ([e,t]) => {
                        c[e] = _(t, a === `plural` || a === `selectordinal`)
                    }
                    ) : c = o,
                    s = a ? (0,
                    h[a])(g(i), c) : g(i),
                    s == null ? t : t + s
                }
                , ``) : t
                  , v = _(n);
                return e(v) && l.test(v) ? u(v) : e(v) ? v : v ? String(v) : ``
            }
        }(_, this._locale, this._locales)(r, s?.formats, this._variables)
    }
    t = this._.bind(this);
    date(e, t) {
        return i(this._locales || this._locale, e, t)
    }
    number(e, t) {
        return a(this._locales || this._locale, e, t)
    }
}
;
function h(e={}) {
    return new m(e)
}
var g = h()
  , _ = 1 / 0;
function v(e) {
    if (!function(e) {
        return Number.isInteger(e) && e >= 0
    }(e))
        throw RangeError(`Not a tick count: ${e}`);
    return e
}
function y(e) {
    return v(Math.round(60 * e))
}
function b(e) {
    return v(Math.max(1, Math.round(60 * e)))
}
var x = 1 / 60
  , S = {
    warmupSeconds: 2,
    windowSeconds: .5,
    slowMs: 18.5,
    fastMs: 17.2,
    ignoreAboveMs: 100,
    minScale: .5,
    step: .85,
    slowWindowsToShrink: 2,
    floorWindowsToDrop: 4,
    fastWindowsToGrow: 8,
    raiseWorkMs: 1.5,
    raiseWindows: 20,
    quietSeconds: .5,
    trialWindows: 8
}
  , ee = {
    hold: 0,
    shrink: 1,
    grow: 2,
    dropTier: 3,
    raiseTier: 4
};
function te(e) {
    return {
        scale: 1,
        warmup: S.warmupSeconds,
        windowTime: 0,
        windowFrames: 0,
        windowWork: 0,
        windowWorked: 0,
        slowWindows: 0,
        fastWindows: 0,
        floorWindows: 0,
        roomyWindows: 0,
        raiseDue: !1,
        quietTime: 0,
        trialWindows: 0,
        canDropTier: !0,
        canRaiseTier: e
    }
}
var ne = 1e3 * x
  , C = 1e3 * S.windowSeconds
  , re = new class {
    waiting = [];
    starved = !1;
    add(e) {
        let t = {
            resolve: e,
            callback: requestIdleCallback(e => {
                this.idle(t, e)
            }
            , {
                timeout: 500
            }),
            since: performance.now()
        };
        this.waiting.push(t)
    }
    serveFrame(e) {
        let t = this.waiting[0];
        if (t === void 0)
            return !1;
        let n = performance.now();
        return !(!this.starved && n - t.since < 100 || (this.starved = !0,
        this.waiting.shift(),
        cancelIdleCallback(t.callback),
        t.resolve(Math.max(1, e - n)),
        0))
    }
    idle(e, t) {
        let n = this.waiting.indexOf(e);
        n >= 0 && this.waiting.splice(n, 1);
        let r = t.didTimeout ? -1 : t.timeRemaining();
        this.starved = r < 1,
        e.resolve(r)
    }
}
;
function ie() {
    return new Promise(e => {
        setTimeout( () => {
            e(_)
        }
        , 0)
    }
    )
}
function w() {
    return new Promise(e => {
        typeof requestIdleCallback == `function` ? re.add(e) : setTimeout( () => {
            e(_)
        }
        , 0)
    }
    )
}
var ae = class {
    timeScale = 1;
    hooks;
    frameInfo = {
        alpha: 0,
        frameDt: 0,
        simMs: 0,
        workMs: -1,
        clock: 0
    };
    acc = 0;
    last = 0;
    lastWorkMs = -1;
    unloadedFrameMs = ne;
    served = !1;
    slicesPausedUntil = 0;
    raf = 0;
    running = !1;
    constructor(e) {
        this.hooks = e
    }
    get active() {
        return this.running
    }
    get held() {
        return !1
    }
    get readsInput() {
        return !0
    }
    now() {
        return performance.now()
    }
    start() {
        this.running || (this.running = !0,
        this.last = performance.now(),
        this.lastWorkMs = -1,
        this.acc = 0,
        this.raf = requestAnimationFrame(this.frame))
    }
    stop() {
        this.running && (this.running = !1,
        cancelAnimationFrame(this.raf))
    }
    advance(e) {
        let t = this.frameInfo;
        if (t.simMs = 0,
        this.hooks.halted())
            return this.acc = 0,
            0;
        this.acc += e;
        let n = performance.now()
          , r = 8 * Math.max(1, this.timeScale)
          , i = 0;
        for (; this.acc >= .016666666666666666 && i < r; )
            if (this.acc -= x,
            this.hooks.step(),
            i++,
            this.hooks.halted()) {
                this.acc = 0;
                break
            }
        return this.acc = Math.min(this.acc, x),
        t.simMs = performance.now() - n,
        i
    }
    tickClock(e) {
        this.frameInfo.clock += e
    }
    serveSlice(e, t) {
        return this.served ? t > 1.5 * this.unloadedFrameMs && (this.slicesPausedUntil = e + C) : t > 0 && t <= S.ignoreAboveMs && (this.unloadedFrameMs += .1 * (t - this.unloadedFrameMs)),
        !(e < this.slicesPausedUntil) && re.serveFrame(e + Math.min(t, ne) - 4)
    }
    frame = e => {
        if (!this.running)
            return;
        let t = performance.now()
          , n = e - this.last
          , r = Math.min(.25, n / 1e3);
        this.last = e;
        let i = this.frameInfo;
        this.advance(r * this.timeScale),
        i.alpha = this.hooks.halted() ? 1 : Math.min(1, this.acc / x),
        i.frameDt = r,
        i.workMs = this.lastWorkMs,
        this.tickClock(r),
        this.hooks.draw(i),
        this.lastWorkMs = performance.now() - t,
        this.served = this.serveSlice(e, n),
        this.raf = requestAnimationFrame(this.frame)
    }
}
  , T = 864e5
  , oe = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?Z$/;
function se(e) {
    if (!function(e) {
        return Number.isInteger(e) && e >= 0 && e <= 255
    }(e))
        throw RangeError(`Not a season id: ${e}`);
    return e
}
var ce = se(0);
function le(e) {
    return Number.isSafeInteger(e)
}
function ue(e) {
    if (!le(e))
        throw RangeError(`Not a UTC millisecond count: ${e}`);
    return e
}
function de(e) {
    let t = oe.exec(e);
    if (t === null)
        throw RangeError(`Not a UTC time such as 2026-11-20T17:00Z: ${e}`);
    let n = e => Number(t[e] ?? 0)
      , r = n(1)
      , i = n(2)
      , a = n(3)
      , o = n(4)
      , s = n(5)
      , c = n(6);
    if (!(i >= 1 && i <= 12 && a >= 1 && a <= function(e) {
        return e.month === 2 ? function(e) {
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        }(e.year) ? 29 : 28 : e.month === 4 || e.month === 6 || e.month === 9 || e.month === 11 ? 30 : 31
    }({
        year: r,
        month: i
    }) && o <= 23 && s <= 59 && c <= 59))
        throw RangeError(`Not a calendar time: ${e}`);
    return ue(function(e) {
        let t = e.month <= 2 ? e.year - 1 : e.year
          , n = Math.floor(t / 400)
          , r = t - 400 * n
          , i = (e.month + 9) % 12
          , a = Math.floor((153 * i + 2) / 5) + e.day - 1;
        return 146097 * n + (365 * r + Math.floor(r / 4) - Math.floor(r / 100) + a) - 719468
    }({
        year: r,
        month: i,
        day: a
    }) * T + 1e3 * (60 * (60 * o + s) + c))
}
function fe(e, t) {
    if (e.id !== t)
        throw RangeError(`Season ${e.id} is listed as season ${t}`);
    let n = se(e.id)
      , r = e.endsAt;
    if (r !== void 0 && (e.startsAt === void 0 || r <= e.startsAt))
        throw RangeError(`Season ${n} ends before it starts`);
    let i = e.announced;
    if (i !== void 0 && i.day % T !== 0)
        throw RangeError(`Season ${n} is announced for a time that is not 00:00 UTC`);
    return {
        ...e,
        id: n
    }
}
var E = {
    game: {
        title: `tibo.dog`,
        url: `https://tibo.dog/`
    },
    seed: {
        mode: `random`,
        fixed: `TIBO`
    },
    seasons: function(e) {
        let[t,...n] = e;
        if (t.startsAt === void 0)
            throw RangeError(`Season 0 needs a start time`);
        let r = [fe(t, 0)];
        for (let[e,i] of n.entries()) {
            let n = fe(i, e + 1)
              , a = r[e] ?? t;
            if (n.startsAt !== void 0) {
                if (a.startsAt === void 0)
                    throw RangeError(`Season ${n.id} has a start time and season ${a.id} has none`);
                if (n.startsAt <= a.startsAt)
                    throw RangeError(`Season ${n.id} starts before season ${a.id}`);
                if (a.endsAt !== void 0 && a.endsAt > n.startsAt)
                    throw RangeError(`Season ${a.id} ends after season ${n.id} starts`)
            }
            r.push(n)
        }
        return r
    }([{
        id: 0,
        startsAt: de(`2026-11-01T21:06:51Z`)
    }, {
        id: 1,
        startsAt: void 0,
        announced: {
            day: de(`2026-11-04T00:00Z`),
            subjectToChange: !0
        }
    }]),
    serverClock: {
        endpoint: `/api/time`,
        waitSec: 10
    },
    runPicker: {
        afterStory: `easy`,
        storyDoneOn: `ending`,
        storyOnStats: !0
    },
    ad: {
        enabled: !0,
        url: `https://x.ai/bot?tibodog`,
        trigger: `everyDeath`,
        everyN: 3,
        closeDelaySec: 2,
        showAfterWin: !0,
        cornerTapMaxSec: .6,
        armSec: 1
    },
    share: {
        intentUrl: `https://x.com/intent/post`,
        hashtags: []
    },
    runLink: {
        maxChars: 2e3,
        deviceDetails: !1,
        inputLog: !1
    },
    madeBy: {
        handle: `@poteto`,
        url: `https://x.com/poteto`
    },
    analytics: {
        enabled: !0,
        endpoint: `/e`,
        flushEvents: 150,
        flushBytes: 48e3,
        perfShare: .1,
        detailShare: 1,
        maxErrors: 5,
        consentCountries: `AT.BE.BG.HR.CY.CZ.DK.EE.FI.FR.DE.GR.HU.IE.IT.LV.LT.LU.MT.NL.PL.PT.RO.SK.SI.ES.SE.IS.LI.NO`.split(`.`),
        consentDefault: !1,
        openDefault: !0,
        regionWaitSec: 20,
        mixedInputShare: .1
    },
    sound: {
        onByDefault: !0,
        crossfadeBars: 2,
        skipFadeBeats: 2,
        followBars: 2,
        pauseFadeOutSec: .4,
        pauseFadeInSec: .6,
        pickupsPerSecond: 8,
        pickupBacklog: 2,
        combatPerSecond: 3,
        chargeVoices: 4
    },
    tiboOutline: {
        enabled: !0,
        width: 2,
        fillOpacity: .6,
        stripeWidth: 1,
        stripePeriod: 3
    },
    death: {
        holdSec: .75
    },
    bootLoader: {
        showAfterSec: .4,
        minShowSec: .3
    },
    introSkip: {
        holdSec: 1,
        stillSteps: 4
    },
    sceneSkip: {
        inStory: !1
    },
    resetHand: {
        enabled: !0,
        hoverQuery: `(hover: hover) and (pointer: fine)`,
        hideCursor: !0,
        armShare: .55,
        tiltDeg: 35,
        pivotMargin: .25,
        followSec: .03,
        reachSec: .05,
        enterSec: .09,
        pressSec: .07,
        holdSec: .04,
        lift: .05
    },
    controlsHint: {
        holdSec: 15,
        fadeInSec: .3,
        fadeOutSec: .6,
        gaugeBottomShare: .56
    },
    hintPhone: {
        typingAtSec: .35,
        messageAtSec: 1.25,
        popSec: .3,
        slideEm: 1.6,
        tiboClearShare: .6,
        gapPx: 4,
        buzzSec: .2,
        buzzDeg: 2.5
    },
    tauntText: {
        arriveSec: 1,
        slideInSec: .3,
        leaveSec: 6.25,
        slideOutSec: .5,
        tiboRightShare: .56,
        tiboBottomShare: .56
    },
    shake: {
        maxOffset: 6,
        decayPerSec: 1.5,
        lowScale: .5,
        entranceKick: 3,
        reset: .85,
        bossLanding: .6,
        potetoBonk: .6,
        chestLanding: .4,
        jackpot: .6,
        triple: .3,
        bossDefeated: .8,
        bigHitShare: .12,
        traumaPerHitShare: 2.5
    },
    jackpot: {
        guardSec: .25,
        coverSec: .2,
        tiers: {
            jackpot: {
                rewards: 5,
                burstSec: .85,
                spinStartSec: .1,
                spinStaggerSec: .06,
                firstLandSec: .55,
                landGapSec: .3,
                evolveGapSec: .6,
                outroSec: .45,
                volume: 1
            },
            triple: {
                rewards: 3,
                burstSec: .5,
                spinStartSec: .08,
                spinStaggerSec: .05,
                firstLandSec: .42,
                landGapSec: .24,
                evolveGapSec: .45,
                outroSec: .45,
                volume: .8
            }
        }
    },
    autoContinue: {
        delaySec: 1
    },
    impact: {
        looks: {
            arrival: {
                kind: `foil`,
                frames: 16
            },
            boss: {
                kind: `ink`,
                frames: 8
            },
            draw: {
                kind: `invert`,
                frames: 3
            },
            slashCut: {
                kind: `ink`,
                frames: 6
            },
            slashSplit: {
                kind: `ink`,
                frames: 12
            },
            bonk: {
                kind: `ink`,
                frames: 14
            }
        },
        ink: [13, 10, 20],
        paper: [255, 248, 236],
        blur: .035,
        ratio: .5,
        floor: .03
    },
    bossBar: {
        downHoldSec: .6
    },
    hazardHurt: {
        tickSec: .5,
        leaveSec: .07,
        numberMin: .5,
        riseSec: .15,
        fallSec: .6
    },
    dash: {
        guardSec: .4,
        flickPx: 30,
        flickWindowMs: 120,
        flickPxPerSec: 400,
        heldFlickPxPerSec: 900,
        flickArrowSec: .35
    },
    rowScroll: {
        dragPx: 5
    },
    renderer: {
        retryFirstSec: 1,
        retryMaxSec: 8,
        restoreWaitSec: 5,
        safeStartWaitMs: 300
    },
    simChunk: {
        retryFirstSec: 1,
        retryMaxSec: 8
    },
    speaker: {
        typeCps: 40,
        maxTypeSec: 1.2,
        blipEvery: 2,
        reading: {
            wordsPerSec: 2,
            cjkCharsPerSec: 4,
            minSec: 1.5,
            holdSec: 1
        }
    },
    amusingBoast: {
        modes: [`standard`, `story`],
        skip: `all`,
        holdSec: 1.3
    },
    alexLine: {
        holdSec: 3,
        poutModes: [`standard`, `story`],
        poutHoldSec: 1.3
    },
    tutorial: {
        lessonWaitSec: 2,
        braceLine: !0
    },
    levelUpLesson: {
        typeDelaySec: .35
    },
    storyAutoPick: {
        idleSec: 8
    },
    storyLine: {
        holdSec: 1.6,
        grokTabSec: 3,
        grokTabByPressSec: 4.5,
        laughTrauma: .7
    },
    potetoAura: `ring`,
    enemySpeech: {
        sayForSec: 2.6,
        everySec: 1.8,
        quietSec: 8,
        maxBubbles: 3,
        cssPerBubble: 120,
        triesPerLine: 3
    },
    keys: {
        reroll: `KeyR`,
        skip: `KeyX`,
        banish: `KeyB`,
        back: `Escape`,
        playAgain: `KeyR`,
        share: `KeyS`,
        dash: `Space`,
        autoAdvance: `KeyT`,
        skipLines: `Space`
    }
}
  , pe = {
    id: `mashquake`,
    tier: `evolved`,
    base: {
        damage: 20,
        cooldown: 2.2,
        amount: 2,
        area: 1.6,
        speed: 180,
        duration: 0,
        pierce: 0,
        knockback: 2.5,
        interval: .3
    },
    behavior: {
        kind: `nova`,
        size: 90,
        thickness: 12,
        onHit: {
            kind: `slow`,
            factor: .4,
            seconds: 1
        },
        fling: {
            count: 6,
            size: 5,
            speed: 90,
            life: 1.4,
            damageMult: 1,
            spread: Math.PI,
            rehit: .3
        }
    },
    from: `mash-wave`,
    catalyst: `big-bowl`
}
  , me = [{
    every: .88,
    power: 1.25,
    aura: 1
}, {
    every: .88,
    power: 1.25,
    aura: 1
}, {
    every: .88,
    power: 1.25,
    aura: .5
}, {
    every: .88,
    power: 1.25,
    aura: .5
}]
  , he = {
    charges: 1,
    moreChargesAt: 3,
    radius: 50,
    push: 220,
    stun: .5,
    stunAt: 5
}
  , ge = {
    range: 600,
    marks: [1, 1, 2, 2, 3],
    bonus: .25,
    seconds: 8
}
  , _e = [{
    parts: [`pomeranian`, `pomchi`],
    into: `zelda-and-link`
}]
  , ve = {
    id: `pomchi`,
    ability: {
        kind: `listen`,
        every: 5,
        ...ge
    },
    aura: {
        luck: .06
    },
    levelUps: me,
    weight: 0,
    legendary: !0,
    speed: 105,
    size: 5
}
  , ye = {
    id: `pomeranian`,
    ability: {
        kind: `puff`,
        every: 10,
        ...he
    },
    aura: {
        recovery: .15
    },
    levelUps: me,
    weight: 0,
    legendary: !0,
    speed: 95,
    size: 5
}
  , be = [{
    id: `butter-streak`,
    tier: `base`,
    on: `dash`,
    base: {
        damage: 9,
        cooldown: 2.5,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 2,
        pierce: 0,
        knockback: 0,
        interval: 0
    },
    levels: [{
        damage: 5
    }, {
        area: .15
    }, {
        duration: .5
    }, {
        damage: 5
    }, {
        area: .15
    }, {
        duration: .5
    }, {
        damage: 9
    }],
    weight: 75,
    behavior: {
        kind: `pool`,
        size: 9,
        hitInterval: .3,
        range: 0,
        trail: {},
        onHit: {
            kind: `slow`,
            factor: .5,
            seconds: 1
        }
    }
}, {
    id: `chip-shuriken`,
    tier: `base`,
    base: {
        damage: 9,
        cooldown: 1.6,
        amount: 3,
        area: 1,
        speed: 110,
        duration: 1.6,
        pierce: 2,
        knockback: 1,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        damage: 5
    }, {
        pierce: 1
    }, {
        amount: 1
    }, {
        damage: 5
    }, {
        speed: 20,
        damage: 6
    }, {
        amount: 2,
        damage: 4
    }],
    weight: 75,
    behavior: {
        kind: `spiral`,
        size: 4,
        spin: 3
    }
}, {
    id: `deep-fryer`,
    tier: `base`,
    base: {
        damage: 6,
        cooldown: 2.4,
        amount: 1,
        area: 1,
        speed: 0,
        duration: .9,
        pierce: 0,
        knockback: .3,
        interval: .1
    },
    levels: [{
        damage: 3
    }, {
        duration: .2
    }, {
        area: .15
    }, {
        damage: 5
    }, {
        cooldown: -.4
    }, {
        area: .15
    }, {
        damage: 7
    }],
    weight: 75,
    behavior: {
        kind: `cone`,
        size: 70,
        angle: .6,
        hitInterval: .15
    }
}, {
    id: `frozen-fries`,
    tier: `base`,
    base: {
        damage: 9,
        cooldown: 1.6,
        amount: 1,
        area: 1,
        speed: 200,
        duration: 1.5,
        pierce: 1,
        knockback: 1,
        interval: .12
    },
    levels: [{
        amount: 1
    }, {
        damage: 4
    }, {
        pierce: 1,
        damage: 1
    }, {
        amount: 1,
        damage: 1
    }, {
        cooldown: -.3,
        damage: 1
    }, {
        pierce: 1,
        damage: 2
    }, {
        amount: 1,
        damage: 3
    }],
    weight: 75,
    behavior: {
        kind: `targetShot`,
        size: 3,
        onHit: {
            kind: `freeze`,
            seconds: 1
        }
    }
}, {
    id: `fry-knives`,
    tier: `base`,
    base: {
        damage: 8,
        cooldown: .9,
        amount: 1,
        area: 1,
        speed: 260,
        duration: 1.2,
        pierce: 1,
        knockback: 1,
        interval: .07
    },
    levels: [{
        amount: 1
    }, {
        amount: 1,
        damage: 5
    }, {
        amount: 1,
        damage: 4
    }, {
        pierce: 1,
        damage: 4
    }, {
        amount: 2
    }, {
        amount: 1,
        damage: 8
    }, {
        pierce: 1,
        damage: 6
    }],
    weight: 100,
    behavior: {
        kind: `facingShot`,
        size: 3,
        spread: .08
    }
}, {
    id: `fry-lance`,
    tier: `base`,
    base: {
        damage: 22,
        cooldown: 2.4,
        amount: 1,
        area: 1,
        speed: 0,
        duration: .25,
        pierce: 0,
        knockback: .8,
        interval: .15
    },
    levels: [{
        damage: 10
    }, {
        area: .25
    }, {
        amount: 1
    }, {
        damage: 10
    }, {
        cooldown: -.3
    }, {
        area: .25
    }, {
        damage: 15
    }],
    weight: 80,
    behavior: {
        kind: `beam`,
        size: 6,
        length: 170
    }
}, {
    id: `fry-sentry`,
    tier: `base`,
    base: {
        damage: 6,
        cooldown: 7,
        amount: 1,
        area: 1,
        speed: 220,
        duration: 5,
        pierce: 0,
        knockback: 1,
        interval: .35
    },
    levels: [{
        damage: 4
    }, {
        duration: .5
    }, {
        amount: 1
    }, {
        damage: 5
    }, {
        cooldown: -1.2
    }, {
        amount: 1
    }, {
        damage: 8
    }],
    weight: 75,
    behavior: {
        kind: `turret`,
        size: 3,
        range: 150
    }
}, {
    id: `frying-pan`,
    tier: `base`,
    base: {
        damage: 18,
        cooldown: 1.6,
        amount: 1,
        area: 1,
        speed: 220,
        duration: 1.5,
        pierce: 0,
        knockback: 2,
        interval: .12
    },
    levels: [{
        damage: 6
    }, {
        area: .15
    }, {
        cooldown: -.2
    }, {
        damage: 6
    }, {
        area: .15
    }, {
        amount: 1
    }, {
        damage: 8
    }],
    weight: 80,
    behavior: {
        kind: `slash`,
        size: 46,
        height: 30,
        reflect: {
            mult: 1.5,
            pierce: 2
        },
        charge: {
            cap: 3,
            area: .35,
            damage: .6
        }
    }
}, {
    id: `grab-bag`,
    tier: `base`,
    base: {
        damage: 14,
        cooldown: 2.2,
        amount: 1,
        area: 1,
        speed: 180,
        duration: 2,
        pierce: 1,
        knockback: 1,
        interval: .25
    },
    levels: [{
        damage: 4
    }, {
        cooldown: -.2
    }, {
        amount: 1
    }, {
        damage: 5
    }, {
        area: .2
    }, {
        cooldown: -.2
    }, {
        amount: 1
    }],
    weight: 75,
    behavior: {
        kind: `targetShot`,
        size: 4,
        mimic: {
            count: 1
        }
    }
}, {
    id: `gravy-boat`,
    tier: `base`,
    base: {
        damage: 8,
        cooldown: 4,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 2.5,
        pierce: 0,
        knockback: 0,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        area: .2,
        damage: 4
    }, {
        duration: .5
    }, {
        amount: 1
    }, {
        damage: 6
    }, {
        duration: .5,
        area: .2
    }, {
        amount: 1
    }],
    weight: 85,
    behavior: {
        kind: `pool`,
        shape: `splat`,
        size: 22,
        hitInterval: .4,
        range: 100
    }
}, {
    id: `hash-boomerang`,
    tier: `base`,
    base: {
        damage: 12,
        cooldown: 2,
        amount: 1,
        area: 1,
        speed: 190,
        duration: 2.6,
        pierce: 99,
        knockback: 1,
        interval: .15
    },
    levels: [{
        damage: 8
    }, {
        cooldown: -.2
    }, {
        amount: 1
    }, {
        damage: 8
    }, {
        speed: 40
    }, {
        amount: 1
    }, {
        damage: 8
    }],
    weight: 90,
    behavior: {
        kind: `boomerang`,
        size: 7,
        returnAccel: 360
    }
}, {
    id: `hash-brown-shield`,
    tier: `base`,
    base: {
        damage: 56,
        cooldown: 3,
        amount: 1,
        area: 1,
        speed: 2.4,
        duration: 0,
        pierce: 99,
        knockback: 2,
        interval: 0
    },
    levels: [{
        damage: 10
    }, {
        cooldown: -.5
    }, {
        amount: 1
    }, {
        damage: 18,
        area: .15
    }, {
        cooldown: -.5
    }, {
        amount: 1
    }, {
        damage: 22
    }],
    weight: 80,
    behavior: {
        kind: `guard`,
        size: 5,
        orbitRadius: 15,
        burst: 60,
        soak: 20
    }
}, {
    id: `hot-potato`,
    tier: `base`,
    base: {
        damage: 7,
        cooldown: 2.6,
        amount: 1,
        area: 1,
        speed: 150,
        duration: 3,
        pierce: 3,
        knockback: 1,
        interval: .3
    },
    levels: [{
        damage: 3,
        pierce: 1
    }, {
        amount: 1
    }, {
        damage: 3,
        pierce: 1
    }, {
        area: .2
    }, {
        cooldown: -.3,
        pierce: 1
    }, {
        amount: 1
    }, {
        damage: 5,
        pierce: 1
    }],
    weight: 75,
    behavior: {
        kind: `homing`,
        size: 5,
        turn: 7,
        fuse: {
            blast: 2.5,
            radius: 30,
            hopRange: 90
        }
    }
}, {
    id: `julienne-dash`,
    tier: `base`,
    on: `dash`,
    base: {
        damage: 22,
        cooldown: 1.2,
        amount: 1,
        area: 1,
        speed: 0,
        duration: .18,
        pierce: 99,
        knockback: .6,
        interval: 0
    },
    levels: [{
        damage: 6
    }, {
        area: .15
    }, {
        damage: 8
    }, {
        area: .15
    }, {
        damage: 14
    }, {
        area: .2
    }, {
        damage: 20
    }],
    weight: 75,
    behavior: {
        kind: `beam`,
        size: 20,
        length: 40
    }
}, {
    id: `mash-wave`,
    tier: `base`,
    base: {
        damage: 15,
        cooldown: 3.2,
        amount: 1,
        area: 1,
        speed: 160,
        duration: 0,
        pierce: 0,
        knockback: 2,
        interval: .35
    },
    levels: [{
        damage: 8
    }, {
        area: .15
    }, {
        cooldown: -.3
    }, {
        damage: 8
    }, {
        amount: 1
    }, {
        area: .15
    }, {
        damage: 12
    }],
    weight: 80,
    behavior: {
        kind: `nova`,
        size: 90,
        thickness: 10
    }
}, {
    id: `mezzaluna`,
    tier: `base`,
    base: {
        damage: 18,
        cooldown: 1.5,
        amount: 1,
        area: 1,
        speed: 0,
        duration: .15,
        pierce: 99,
        knockback: 1.5,
        interval: .12
    },
    levels: [{
        damage: 6
    }, {
        area: .1
    }, {
        damage: 6
    }, {
        cooldown: -.15
    }, {
        damage: 9,
        area: .1
    }, {
        damage: 9
    }, {
        damage: 12
    }],
    weight: 80,
    behavior: {
        kind: `slash`,
        size: 58,
        height: 26,
        hpEdge: {
            lowHpBonus: 1.2
        },
        fling: {
            count: 1,
            size: 3,
            speed: 150,
            life: .7,
            damageMult: .4,
            spread: .3,
            rehit: 1,
            fromLevel: 5,
            countPerLevel: 1,
            back: !0
        }
    }
}, {
    id: `peeler`,
    tier: `base`,
    base: {
        damage: 12,
        cooldown: 1,
        amount: 1,
        area: 1,
        speed: 0,
        duration: .15,
        pierce: 99,
        knockback: 1,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        damage: 5
    }, {
        area: .15
    }, {
        damage: 5
    }, {
        damage: 5,
        area: .15
    }, {
        damage: 5
    }, {
        damage: 7
    }],
    weight: 100,
    behavior: {
        kind: `slash`,
        size: 64,
        height: 20,
        fling: {
            count: 2,
            size: 3,
            speed: 40,
            life: 2.2,
            damageMult: .45,
            spread: .6,
            rehit: 6,
            fromLevel: 4,
            countPerLevel: 1
        }
    }
}, {
    id: `potato-battery`,
    tier: `base`,
    base: {
        damage: 5,
        cooldown: 2.5,
        amount: 0,
        area: 1,
        speed: 0,
        duration: 4,
        pierce: 0,
        knockback: 0,
        interval: 0
    },
    levels: [{
        damage: 2
    }, {
        duration: .5
    }, {
        area: .25
    }, {
        amount: 1
    }, {
        damage: 5
    }, {
        cooldown: -.5
    }, {
        damage: 5,
        area: .25
    }],
    weight: 70,
    behavior: {
        kind: `tether`,
        size: 8,
        minRange: 50,
        range: 110,
        snap: 170,
        hitInterval: .25,
        discharge: 5,
        pin: .85,
        onHit: {
            kind: `slow`,
            factor: .5,
            seconds: .3
        }
    }
}, {
    id: `potato-rain`,
    tier: `base`,
    base: {
        damage: 24,
        cooldown: 5,
        amount: 6,
        area: 1,
        speed: 0,
        duration: 2,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    levels: [{
        amount: 2
    }, {
        damage: 10
    }, {
        area: .15
    }, {
        amount: 2
    }, {
        cooldown: -.9
    }, {
        damage: 20
    }, {
        amount: 3
    }],
    weight: 75,
    behavior: {
        kind: `rain`,
        size: 18,
        spread: 110,
        delay: .45
    }
}, {
    id: `reset-button`,
    tier: `base`,
    base: {
        damage: 0,
        cooldown: 90,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    levels: [{
        cooldown: -4.3
    }, {
        cooldown: -4.3
    }, {
        cooldown: -4.3
    }, {
        cooldown: -4.3
    }, {
        cooldown: -4.3
    }, {
        cooldown: -4.3
    }, {
        cooldown: -4.3
    }],
    weight: 65,
    behavior: {
        kind: `nuke`
    }
}, {
    id: `root-cellar`,
    tier: `base`,
    base: {
        damage: 8,
        cooldown: 2.4,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: 0,
        interval: 0
    },
    levels: [{
        damage: 4
    }, {
        area: .15
    }, {
        cooldown: -.3
    }, {
        damage: 10
    }, {
        area: .15
    }, {
        cooldown: -.5
    }, {
        damage: 16,
        area: .1
    }],
    weight: 70,
    behavior: {
        kind: `ring`,
        size: 40,
        width: 12,
        onHit: {
            kind: `freeze`,
            seconds: .7
        },
        bossOnHit: {
            kind: `slow`,
            factor: .4,
            seconds: 1
        }
    }
}, {
    id: `root-spikes`,
    tier: `base`,
    base: {
        damage: 22,
        cooldown: 2.8,
        amount: 3,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        damage: 8
    }, {
        area: .2
    }, {
        amount: 1
    }, {
        damage: 14
    }, {
        cooldown: -.6
    }, {
        amount: 3
    }],
    weight: 75,
    behavior: {
        kind: `strike`,
        size: 10,
        range: 80,
        delay: .3
    }
}, {
    id: `rosti-disc`,
    tier: `base`,
    base: {
        damage: 10,
        cooldown: 2.6,
        amount: 1,
        area: 1,
        speed: 180,
        duration: 2.5,
        pierce: 99,
        knockback: 1,
        interval: .2
    },
    levels: [{
        damage: 5,
        speed: 30
    }, {
        amount: 1
    }, {
        duration: .4
    }, {
        damage: 5
    }, {
        amount: 1
    }, {
        speed: 30,
        duration: .4
    }, {
        damage: 10
    }],
    weight: 85,
    behavior: {
        kind: `bouncer`,
        size: 6
    }
}, {
    id: `salt-line`,
    tier: `base`,
    base: {
        damage: 8,
        cooldown: .2,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 2,
        pierce: 0,
        knockback: 0,
        interval: .1
    },
    levels: [{
        damage: 4
    }, {
        duration: .5
    }, {
        area: .2
    }, {
        damage: 4
    }, {
        duration: .5
    }, {
        area: .2
    }, {
        damage: 8
    }],
    weight: 75,
    behavior: {
        kind: `pool`,
        size: 9,
        hitInterval: .3,
        range: 0,
        trail: {},
        onHit: {
            kind: `slow`,
            factor: .45,
            seconds: 1
        }
    }
}, {
    id: `seeker-sprouts`,
    tier: `base`,
    base: {
        damage: 12,
        cooldown: 2,
        amount: 3,
        area: 1,
        speed: 120,
        duration: 3,
        pierce: 0,
        knockback: 1,
        interval: .12
    },
    levels: [{
        damage: 4
    }, {
        damage: 6
    }, {
        speed: 40,
        damage: 4
    }, {
        amount: 1,
        cooldown: -.3
    }, {
        damage: 10
    }, {
        pierce: 1,
        cooldown: -.2
    }, {
        amount: 1,
        damage: 6
    }],
    weight: 80,
    behavior: {
        kind: `homing`,
        size: 4,
        turn: 5
    }
}, {
    id: `small-fry`,
    tier: `base`,
    base: {
        damage: 5,
        cooldown: .5,
        amount: 1,
        area: 1,
        speed: 200,
        duration: 1.5,
        pierce: 0,
        knockback: .5,
        interval: .08
    },
    levels: [{
        amount: 1
    }, {
        damage: 1
    }, {
        amount: 1
    }, {
        damage: 1
    }, {
        damage: 1
    }, {
        amount: 1
    }, {
        pierce: 1
    }],
    weight: 75,
    behavior: {
        kind: `targetShot`,
        size: 2,
        growOnKill: {
            perKill: .05,
            cap: 12
        }
    }
}, {
    id: `sprout-satellites`,
    tier: `base`,
    base: {
        damage: 14,
        cooldown: 3,
        amount: 2,
        area: 1,
        speed: 3.2,
        duration: 4,
        pierce: 0,
        knockback: 1.2,
        interval: .1
    },
    levels: [{
        damage: 4
    }, {
        speed: .6,
        damage: 8
    }, {
        duration: .5,
        area: .2
    }, {
        amount: 1,
        cooldown: -.5
    }, {
        damage: 14,
        area: .2
    }, {
        duration: .5,
        cooldown: -.5
    }, {
        amount: 1,
        damage: 8
    }],
    weight: 90,
    behavior: {
        kind: `orbit`,
        size: 6,
        orbitRadius: 38,
        hitInterval: .4
    }
}, {
    id: `spud-cannon`,
    tier: `base`,
    base: {
        damage: 20,
        cooldown: 2.2,
        amount: 1,
        area: 1,
        speed: 170,
        duration: 2,
        pierce: 0,
        knockback: 1.5,
        interval: .15
    },
    levels: [{
        damage: 10
    }, {
        area: .2
    }, {
        amount: 1
    }, {
        damage: 10
    }, {
        cooldown: -.3
    }, {
        area: .2
    }, {
        damage: 15
    }],
    weight: 85,
    behavior: {
        kind: `explosive`,
        size: 5,
        explodeRadius: 22
    }
}, {
    id: `spud-dice`,
    tier: `base`,
    base: {
        damage: 14,
        cooldown: 2,
        amount: 1,
        area: 1,
        speed: 150,
        duration: 2,
        pierce: 0,
        knockback: 1.5,
        interval: .2
    },
    levels: [{
        damage: 5
    }, {
        cooldown: -.2
    }, {
        amount: 1
    }, {
        area: .2
    }, {
        damage: 6
    }, {
        cooldown: -.2
    }, {
        amount: 1
    }],
    weight: 75,
    behavior: {
        kind: `explosive`,
        size: 5,
        explodeRadius: 20,
        dice: {
            rolls: 1
        }
    }
}, {
    id: `spud-lob`,
    tier: `base`,
    base: {
        damage: 25,
        cooldown: 2.7,
        amount: 1,
        area: 1,
        speed: 210,
        duration: 3,
        pierce: 3,
        knockback: 1.5,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        damage: 15
    }, {
        pierce: 2
    }, {
        amount: 1
    }, {
        damage: 15
    }, {
        pierce: 2
    }, {
        damage: 15
    }],
    weight: 90,
    behavior: {
        kind: `lob`,
        size: 7,
        gravity: 420,
        spreadX: 90
    }
}, {
    id: `starch-bolt`,
    tier: `base`,
    base: {
        damage: 18,
        cooldown: 2,
        amount: 2,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: .5,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        area: .25,
        damage: 10
    }, {
        amount: 1
    }, {
        damage: 10
    }, {
        amount: 1
    }, {
        area: .25,
        damage: 10
    }, {
        amount: 1
    }],
    weight: 85,
    behavior: {
        kind: `strike`,
        size: 12,
        range: 160
    }
}, {
    id: `starch-chain`,
    tier: `base`,
    base: {
        damage: 14,
        cooldown: 1.8,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 3,
        knockback: .3,
        interval: .2
    },
    levels: [{
        pierce: 1
    }, {
        damage: 6
    }, {
        amount: 1
    }, {
        pierce: 1
    }, {
        damage: 8
    }, {
        pierce: 2
    }, {
        damage: 10
    }],
    weight: 80,
    behavior: {
        kind: `chain`,
        range: 150,
        jump: 70
    }
}, {
    id: `steam-vent`,
    tier: `base`,
    base: {
        damage: 5,
        cooldown: 0,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: .4,
        interval: .1
    },
    levels: [{
        area: .2,
        damage: 2
    }, {
        damage: 3
    }, {
        area: .3
    }, {
        damage: 6
    }, {
        area: .3
    }, {
        damage: 6
    }, {
        area: .3,
        damage: 8
    }],
    weight: 90,
    behavior: {
        kind: `aura`,
        size: 32,
        hitInterval: .5
    }
}, {
    id: `tater-mines`,
    tier: `base`,
    base: {
        damage: 30,
        cooldown: 2.5,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 12,
        pierce: 0,
        knockback: 2,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        damage: 15
    }, {
        area: .2
    }, {
        amount: 1
    }, {
        cooldown: -.4
    }, {
        damage: 20
    }, {
        amount: 1
    }],
    weight: 80,
    behavior: {
        kind: `mine`,
        size: 26,
        trigger: 14
    }
}, {
    id: `tater-pup`,
    tier: `base`,
    base: {
        damage: 9,
        cooldown: 1,
        amount: 1,
        area: 1,
        speed: 200,
        duration: 1.5,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    levels: [{
        damage: 3
    }, {
        amount: 1
    }, {
        cooldown: -.2
    }, {
        damage: 6
    }, {
        pierce: 1,
        damage: 3
    }, {
        amount: 1
    }, {
        damage: 7
    }],
    weight: 70,
    behavior: {
        kind: `familiar`,
        size: 3,
        range: 150
    }
}, {
    id: `tot-toss`,
    tier: `base`,
    base: {
        damage: 10,
        cooldown: 1.1,
        amount: 1,
        area: 1,
        speed: 170,
        duration: 2,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    levels: [{
        amount: 1
    }, {
        cooldown: -.1
    }, {
        amount: 1
    }, {
        damage: 10
    }, {
        amount: 1
    }, {
        pierce: 1
    }, {
        damage: 10
    }],
    weight: 100,
    behavior: {
        kind: `targetShot`,
        size: 4
    }
}, {
    id: `whisk-vortex`,
    tier: `base`,
    base: {
        damage: 3,
        cooldown: 3.2,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 2,
        pierce: 0,
        knockback: 0,
        interval: .1
    },
    levels: [{
        damage: 1
    }, {
        duration: .3
    }, {
        area: .15
    }, {
        damage: 1
    }, {
        duration: .3
    }, {
        amount: 1
    }, {
        area: .15
    }],
    weight: 80,
    behavior: {
        kind: `pool`,
        shape: `clover`,
        size: 30,
        hitInterval: .25,
        range: 130,
        pull: {
            speed: 100,
            radius: 60
        }
    }
}]
  , xe = [{
    id: `big-fry`,
    tier: `evolved`,
    base: {
        damage: 10,
        cooldown: .45,
        amount: 3,
        area: 1,
        speed: 220,
        duration: 1.5,
        pierce: 99,
        knockback: .8,
        interval: .06
    },
    behavior: {
        kind: `targetShot`,
        size: 3,
        growOnKill: {
            perKill: .08,
            cap: 25,
            size: !0
        }
    },
    from: `small-fry`,
    catalyst: `fertilizer`
}, {
    id: `bottomless-sack`,
    tier: `evolved`,
    base: {
        damage: 20,
        cooldown: 1.6,
        amount: 2,
        area: 1.2,
        speed: 200,
        duration: 2,
        pierce: 2,
        knockback: 1,
        interval: .25
    },
    behavior: {
        kind: `targetShot`,
        size: 4,
        mimic: {
            count: 2,
            evolved: !0
        }
    },
    from: `grab-bag`,
    catalyst: `sprouting-eyes`
}, {
    id: `cast-iron`,
    tier: `evolved`,
    base: {
        damage: 34,
        cooldown: 1.1,
        amount: 2,
        area: 1.3,
        speed: 240,
        duration: 2,
        pierce: 0,
        knockback: 2.5,
        interval: .12
    },
    behavior: {
        kind: `slash`,
        size: 50,
        height: 34,
        reflect: {
            mult: 2.5,
            pierce: 4,
            homing: !0
        },
        charge: {
            cap: 3,
            area: .35,
            damage: .75
        }
    },
    from: `frying-pan`,
    catalyst: `starch-plating`
}, {
    id: `cold-storage`,
    tier: `evolved`,
    base: {
        damage: 110,
        cooldown: 1,
        amount: 1,
        area: 1.5,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: 0,
        interval: 0
    },
    behavior: {
        kind: `ring`,
        size: 40,
        width: 12,
        onHit: {
            kind: `freeze`,
            seconds: 1.1
        },
        bossOnHit: {
            kind: `slow`,
            factor: .5,
            seconds: 1.5
        }
    },
    from: `root-cellar`,
    catalyst: `slow-cooker`
}, {
    id: `eternal-sprouts`,
    tier: `evolved`,
    base: {
        damage: 80,
        cooldown: 0,
        amount: 5,
        area: 1.3,
        speed: 4.4,
        duration: 0,
        pierce: 0,
        knockback: 1.4,
        interval: .1
    },
    behavior: {
        kind: `orbit`,
        size: 6,
        orbitRadius: 54,
        hitInterval: .35,
        permanent: !0
    },
    from: `sprout-satellites`,
    catalyst: `slow-cooker`
}, {
    id: `factory-reset`,
    tier: `evolved`,
    base: {
        damage: 0,
        cooldown: 45,
        amount: 1,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    behavior: {
        kind: `nuke`,
        keepDrops: !0,
        bossHitMult: 1.6,
        heal: 30
    },
    from: `reset-button`,
    catalyst: `four-eyed-spud`
}, {
    id: `ghee-glide`,
    tier: `evolved`,
    on: `dash`,
    base: {
        damage: 80,
        cooldown: 1.8,
        amount: 1,
        area: 1.5,
        speed: 0,
        duration: 3.5,
        pierce: 0,
        knockback: 0,
        interval: 0
    },
    behavior: {
        kind: `pool`,
        size: 9,
        hitInterval: .3,
        range: 0,
        trail: {
            haste: .15
        },
        onHit: {
            kind: `slow`,
            factor: .5,
            seconds: 1
        }
    },
    from: `butter-streak`,
    catalyst: `spud-sneakers`
}, {
    id: `golden-harvest`,
    tier: `evolved`,
    base: {
        damage: 110,
        cooldown: 3,
        amount: 20,
        area: 1.4,
        speed: 0,
        duration: 2,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    behavior: {
        kind: `rain`,
        size: 18,
        spread: 130,
        delay: .4,
        goldOnKill: .1
    },
    from: `potato-rain`,
    catalyst: `golden-fry`
}, {
    id: `gratin-arc`,
    tier: `evolved`,
    base: {
        damage: 30,
        cooldown: 1,
        amount: 2,
        area: 1,
        speed: 0,
        duration: 0,
        pierce: 10,
        knockback: .4,
        interval: .1
    },
    behavior: {
        kind: `chain`,
        range: 170,
        jump: 85,
        critBonus: .25
    },
    from: `starch-chain`,
    catalyst: `hot-sauce`
}, {
    id: `gravy-flood`,
    tier: `evolved`,
    base: {
        damage: 18,
        cooldown: 3,
        amount: 4,
        area: 1.6,
        speed: 0,
        duration: 4,
        pierce: 0,
        knockback: 0,
        interval: .1
    },
    behavior: {
        kind: `pool`,
        shape: `splat`,
        size: 22,
        hitInterval: .35,
        range: 150,
        grow: .5,
        follow: 18
    },
    from: `gravy-boat`,
    catalyst: `potato-magnet`
}, {
    id: `hash-bulwark`,
    tier: `evolved`,
    base: {
        damage: 240,
        cooldown: 2,
        amount: 3,
        area: 1.3,
        speed: 2.8,
        duration: 0,
        pierce: 99,
        knockback: 3,
        interval: 0
    },
    behavior: {
        kind: `guard`,
        size: 6,
        orbitRadius: 17,
        burst: 72,
        soak: 30,
        onHit: {
            kind: `freeze`,
            seconds: .8
        }
    },
    from: `hash-brown-shield`,
    catalyst: `starch-plating`
}, {
    id: `hashnado`,
    tier: `evolved`,
    base: {
        damage: 40,
        cooldown: 1.2,
        amount: 4,
        area: 1.6,
        speed: 220,
        duration: 2.8,
        pierce: 99,
        knockback: 1,
        interval: .08
    },
    behavior: {
        kind: `boomerang`,
        size: 7,
        returnAccel: 340
    },
    from: `hash-boomerang`,
    catalyst: `sour-cream`
}, {
    id: `inferno-basket`,
    tier: `evolved`,
    base: {
        damage: 24,
        cooldown: 1.2,
        amount: 1,
        area: 1.5,
        speed: 0,
        duration: 1.6,
        pierce: 0,
        knockback: .4,
        interval: .1
    },
    behavior: {
        kind: `cone`,
        size: 70,
        angle: .75,
        hitInterval: .12,
        eliteMult: 2,
        onHit: {
            kind: `burn`,
            dps: 20,
            seconds: 2
        }
    },
    from: `deep-fryer`,
    catalyst: `bacon-bits`
}, {
    id: `kettle-cyclone`,
    tier: `evolved`,
    base: {
        damage: 21,
        cooldown: .8,
        amount: 8,
        area: 1.4,
        speed: 130,
        duration: 1.8,
        pierce: 4,
        knockback: 1,
        interval: .1
    },
    behavior: {
        kind: `spiral`,
        size: 4,
        spin: 3.4
    },
    from: `chip-shuriken`,
    catalyst: `gpu`
}, {
    id: `landmine-harvest`,
    tier: `evolved`,
    base: {
        damage: 75,
        cooldown: 1.5,
        amount: 3,
        area: 1.6,
        speed: 0,
        duration: 14,
        pierce: 0,
        knockback: 2.5,
        interval: .1
    },
    behavior: {
        kind: `mine`,
        size: 26,
        trigger: 16,
        goldOnKill: .25
    },
    from: `tater-mines`,
    catalyst: `rotten-spud`
}, {
    id: `loaded-dice`,
    tier: `evolved`,
    base: {
        damage: 26,
        cooldown: 1.4,
        amount: 3,
        area: 1.4,
        speed: 160,
        duration: 2,
        pierce: 0,
        knockback: 1.5,
        interval: .08
    },
    behavior: {
        kind: `explosive`,
        size: 6,
        explodeRadius: 24,
        dice: {
            rolls: 2
        }
    },
    from: `spud-dice`,
    catalyst: `four-eyed-spud`
}, {
    id: `mandoline-fury`,
    tier: `evolved`,
    base: {
        damage: 72,
        cooldown: .8,
        amount: 2,
        area: 1.6,
        speed: 0,
        duration: .15,
        pierce: 99,
        knockback: 1.3,
        interval: .1
    },
    behavior: {
        kind: `slash`,
        size: 64,
        height: 34,
        heal: .25,
        fling: {
            count: 4,
            size: 3,
            speed: 40,
            life: 2.2,
            damageMult: .5,
            spread: .6,
            rehit: 6
        }
    },
    from: `peeler`,
    catalyst: `gravy-heart`
}, pe, {
    id: `moon-cleaver`,
    tier: `evolved`,
    base: {
        damage: 120,
        cooldown: 1.15,
        amount: 2,
        area: 1.35,
        speed: 0,
        duration: .15,
        pierce: 99,
        knockback: 2,
        interval: .1
    },
    behavior: {
        kind: `slash`,
        size: 62,
        height: 30,
        hpEdge: {
            lowHpBonus: 1.6
        },
        fling: {
            count: 4,
            size: 3,
            speed: 170,
            life: .8,
            damageMult: .4,
            spread: .45,
            rehit: 1,
            back: !0
        }
    },
    from: `mezzaluna`,
    catalyst: `rotten-spud`
}, {
    id: `overgrowth`,
    tier: `evolved`,
    base: {
        damage: 40,
        cooldown: 1,
        amount: 5,
        area: 1,
        speed: 200,
        duration: 3,
        pierce: 1,
        knockback: 1,
        interval: .08
    },
    behavior: {
        kind: `homing`,
        size: 4,
        turn: 8,
        split: 2
    },
    from: `seeker-sprouts`,
    catalyst: `fertilizer`
}, {
    id: `permafrost-fries`,
    tier: `evolved`,
    base: {
        damage: 48,
        cooldown: 1,
        amount: 4,
        area: 1,
        speed: 230,
        duration: 1.5,
        pierce: 3,
        knockback: 1,
        interval: .08
    },
    behavior: {
        kind: `targetShot`,
        size: 3,
        onHit: {
            kind: `freeze`,
            seconds: 2
        },
        shatter: 2
    },
    from: `frozen-fries`,
    catalyst: `thick-skin`
}, {
    id: `pressure-cooker`,
    tier: `evolved`,
    base: {
        damage: 45,
        cooldown: 0,
        amount: 1,
        area: 1.9,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: .6,
        interval: .1
    },
    behavior: {
        kind: `aura`,
        size: 44,
        hitInterval: .3,
        heal: .12,
        healCap: 2
    },
    from: `steam-vent`,
    catalyst: `root-network`
}, {
    id: `railfry`,
    tier: `evolved`,
    base: {
        damage: 58,
        cooldown: 1.6,
        amount: 3,
        area: 1.8,
        speed: 0,
        duration: .25,
        pierce: 0,
        knockback: 1,
        interval: .1
    },
    behavior: {
        kind: `beam`,
        size: 6,
        length: 270
    },
    from: `fry-lance`,
    catalyst: `spud-sneakers`
}, {
    id: `rosti-storm`,
    tier: `evolved`,
    base: {
        damage: 26,
        cooldown: 2,
        amount: 4,
        area: 1.2,
        speed: 220,
        duration: 4,
        pierce: 99,
        knockback: 1,
        interval: .15
    },
    behavior: {
        kind: `bouncer`,
        size: 6,
        explodeOnBounce: 20
    },
    from: `rosti-disc`,
    catalyst: `starch-plating`
}, {
    id: `sack-of-russets`,
    tier: `evolved`,
    base: {
        damage: 60,
        cooldown: 2.2,
        amount: 4,
        area: 1.6,
        speed: 230,
        duration: 3,
        pierce: 99,
        knockback: 2,
        interval: .1
    },
    behavior: {
        kind: `lob`,
        size: 7,
        gravity: 420,
        spreadX: 130
    },
    from: `spud-lob`,
    catalyst: `butter-pat`
}, {
    id: `salt-flats`,
    tier: `evolved`,
    base: {
        damage: 80,
        cooldown: .12,
        amount: 1,
        area: 1.7,
        speed: 0,
        duration: 3,
        pierce: 0,
        knockback: 0,
        interval: .1
    },
    behavior: {
        kind: `pool`,
        size: 11,
        hitInterval: .25,
        range: 0,
        trail: {
            push: 60
        },
        onHit: {
            kind: `slow`,
            factor: .55,
            seconds: 1.2
        }
    },
    from: `salt-line`,
    catalyst: `spud-sneakers`
}, {
    id: `spicy-hot-potato`,
    tier: `evolved`,
    base: {
        damage: 12,
        cooldown: 2,
        amount: 2,
        area: 1.3,
        speed: 160,
        duration: 3,
        pierce: 5,
        knockback: 1,
        interval: .3
    },
    behavior: {
        kind: `homing`,
        size: 6,
        turn: 8,
        fuse: {
            blast: 3,
            radius: 30,
            hopRange: 110,
            respawn: 2
        }
    },
    from: `hot-potato`,
    catalyst: `hot-sauce`
}, {
    id: `spud-grid`,
    tier: `evolved`,
    base: {
        damage: 80,
        cooldown: 1.5,
        amount: 2,
        area: 1.5,
        speed: 0,
        duration: 5,
        pierce: 0,
        knockback: 0,
        interval: 0
    },
    behavior: {
        kind: `tether`,
        size: 8,
        minRange: 60,
        range: 140,
        snap: 200,
        hitInterval: .2,
        discharge: 14,
        pin: .85,
        clipsBosses: !0,
        onHit: {
            kind: `slow`,
            factor: .5,
            seconds: .3
        }
    },
    from: `potato-battery`,
    catalyst: `root-network`
}, {
    id: `spudzooka`,
    tier: `evolved`,
    base: {
        damage: 50,
        cooldown: 1.4,
        amount: 2,
        area: 1.8,
        speed: 200,
        duration: 2,
        pierce: 0,
        knockback: 2,
        interval: .12
    },
    behavior: {
        kind: `explosive`,
        size: 6,
        explodeRadius: 22,
        cluster: 4
    },
    from: `spud-cannon`,
    catalyst: `hot-sauce`
}, {
    id: `stand-mixer`,
    tier: `evolved`,
    base: {
        damage: 7,
        cooldown: 2.8,
        amount: 2,
        area: 1.3,
        speed: 0,
        duration: 2.5,
        pierce: 0,
        knockback: 0,
        interval: .1
    },
    behavior: {
        kind: `pool`,
        shape: `clover`,
        size: 36,
        hitInterval: .2,
        range: 150,
        pull: {
            speed: 130,
            radius: 70,
            slam: 3
        }
    },
    from: `whisk-vortex`,
    catalyst: `big-bowl`
}, {
    id: `taproot-eruption`,
    tier: `evolved`,
    base: {
        damage: 90,
        cooldown: 1.5,
        amount: 8,
        area: 1.6,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: 3,
        interval: .1
    },
    behavior: {
        kind: `strike`,
        size: 10,
        range: 150,
        delay: .25
    },
    from: `root-spikes`,
    catalyst: `masher-grip`
}, {
    id: `thousand-fries`,
    tier: `evolved`,
    base: {
        damage: 24,
        cooldown: .1,
        amount: 2,
        area: 1,
        speed: 320,
        duration: 1.2,
        pierce: 5,
        knockback: 1,
        interval: .03
    },
    behavior: {
        kind: `facingShot`,
        size: 3,
        spread: .25
    },
    from: `fry-knives`,
    catalyst: `salt-shaker`
}, {
    id: `thunder-tuber`,
    tier: `evolved`,
    base: {
        damage: 66,
        cooldown: 1.7,
        amount: 8,
        area: 2,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: .6,
        interval: .1
    },
    behavior: {
        kind: `strike`,
        size: 12,
        range: 180
    },
    from: `starch-bolt`,
    catalyst: `sprouting-eyes`
}, {
    id: `tot-gatling`,
    tier: `evolved`,
    base: {
        damage: 24,
        cooldown: .13,
        amount: 1,
        area: 1,
        speed: 230,
        duration: 2,
        pierce: 2,
        knockback: 1,
        interval: .1
    },
    behavior: {
        kind: `targetShot`,
        size: 4
    },
    from: `tot-toss`,
    catalyst: `chives`
}, {
    id: `waffle-cut`,
    tier: `evolved`,
    on: `dash`,
    base: {
        damage: 110,
        cooldown: 1.3,
        amount: 2,
        area: 1.6,
        speed: 0,
        duration: .25,
        pierce: 99,
        knockback: .8,
        interval: .5
    },
    behavior: {
        kind: `beam`,
        size: 16,
        length: 40,
        cross: !0
    },
    from: `julienne-dash`,
    catalyst: `butter-socks`
}]
  , Se = [{
    id: `fry-brigade`,
    tier: `union`,
    base: {
        damage: 22,
        cooldown: .3,
        amount: 4,
        area: 1,
        speed: 240,
        duration: 1.5,
        pierce: 2,
        knockback: 1,
        interval: .4
    },
    behavior: {
        kind: `familiar`,
        size: 3,
        range: 170,
        plant: {
            everySec: 5,
            lifeSec: 5
        }
    },
    from: [`fry-sentry`, `tater-pup`]
}, {
    id: `spud-artillery`,
    tier: `union`,
    base: {
        damage: 84,
        cooldown: 1.8,
        amount: 5,
        area: 1.6,
        speed: 230,
        duration: 3,
        pierce: 2,
        knockback: 2,
        interval: .1
    },
    behavior: {
        kind: `lob`,
        size: 7,
        gravity: 420,
        spreadX: 140,
        explodeRadius: 32
    },
    from: [`spud-lob`, `spud-cannon`]
}, {
    id: `starch-supercell`,
    tier: `union`,
    base: {
        damage: 80,
        cooldown: 1.6,
        amount: 6,
        area: 1.8,
        speed: 0,
        duration: 0,
        pierce: 0,
        knockback: .6,
        interval: .1
    },
    behavior: {
        kind: `strike`,
        size: 12,
        range: 190,
        chain: 3,
        jump: 80
    },
    from: [`starch-bolt`, `starch-chain`]
}]
  , Ce = [{
    id: `bacon-bits`,
    stat: `eliteDamage`,
    perLevel: .12,
    maxLevel: 5,
    weight: 80
}, {
    id: `big-bowl`,
    stat: `area`,
    perLevel: .1,
    maxLevel: 5,
    weight: 100
}, {
    id: `butter-pat`,
    stat: `might`,
    perLevel: .1,
    maxLevel: 5,
    weight: 100
}, {
    id: `butter-socks`,
    stat: `dashCharges`,
    perLevel: [1, 1, 2, 2, 3],
    extra: {
        stat: `dashCooldown`,
        perLevel: .06
    },
    maxLevel: 5,
    weight: 80
}, {
    id: `chives`,
    stat: `cooldown`,
    perLevel: .07,
    maxLevel: 5,
    weight: 100
}, {
    id: `fertilizer`,
    stat: `growth`,
    perLevel: .08,
    maxLevel: 5,
    weight: 90
}, {
    id: `four-eyed-spud`,
    stat: `luck`,
    perLevel: .1,
    maxLevel: 5,
    weight: 80
}, {
    id: `golden-fry`,
    stat: `greed`,
    perLevel: .12,
    maxLevel: 5,
    weight: 80
}, {
    id: `gpu`,
    stat: `amount`,
    perLevel: [1, 1, 1, 1, 1],
    extra: {
        stat: `cooldown`,
        perLevel: .02
    },
    thermal: {
        cap: [20, 24, 28, 32, 36],
        coolPerSec: [2.6, 2.65, 2.7, 2.75, 2.8],
        maxVolleyHeat: 6,
        throttleSec: 3,
        throttleRate: .5
    },
    maxLevel: 5,
    weight: 40
}, {
    id: `gravy-heart`,
    stat: `maxHpPct`,
    perLevel: .12,
    maxLevel: 5,
    weight: 100
}, {
    id: `hot-sauce`,
    stat: `critChance`,
    perLevel: .06,
    maxLevel: 5,
    weight: 85
}, {
    id: `masher-grip`,
    stat: `knockback`,
    perLevel: .25,
    maxLevel: 5,
    weight: 75
}, {
    id: `potato-magnet`,
    stat: `magnet`,
    perLevel: .25,
    maxLevel: 5,
    weight: 90
}, {
    id: `root-network`,
    stat: `recovery`,
    perLevel: .25,
    maxLevel: 5,
    weight: 90
}, {
    id: `rotten-spud`,
    stat: `curse`,
    perLevel: .1,
    maxLevel: 5,
    weight: 60
}, {
    id: `salt-shaker`,
    stat: `speed`,
    perLevel: .1,
    maxLevel: 5,
    weight: 90
}, {
    id: `slow-cooker`,
    stat: `duration`,
    perLevel: .1,
    maxLevel: 5,
    weight: 90
}, {
    id: `sour-cream`,
    stat: `critDamage`,
    perLevel: .2,
    maxLevel: 5,
    weight: 80
}, {
    id: `sprouting-eyes`,
    stat: `amount`,
    perLevel: [1, 1, 2, 2, 3],
    maxLevel: 5,
    weight: 70
}, {
    id: `spud-sneakers`,
    stat: `moveSpeed`,
    perLevel: .08,
    maxLevel: 5,
    weight: 90
}, {
    id: `starch-plating`,
    stat: `armor`,
    perLevel: 20,
    maxLevel: 5,
    weight: 90
}, {
    id: `thick-skin`,
    stat: `evasion`,
    perLevel: .05,
    maxLevel: 5,
    weight: 80
}]
  , we = [{
    id: `baked-buckler`,
    tier: `base`,
    rarity: 1,
    mods: {
        armor: 10
    },
    weight: 8
}, {
    id: `boom-spud`,
    tier: `base`,
    rarity: 2,
    mods: {
        explodeOnKill: .12
    },
    weight: 6
}, {
    id: `boss-buster`,
    tier: `base`,
    rarity: 2,
    mods: {
        eliteDamage: .15
    },
    weight: 6
}, {
    id: `chive-charm`,
    tier: `base`,
    rarity: 1,
    mods: {
        cooldown: .03
    },
    weight: 8
}, {
    id: `coal-baked-spud`,
    tier: `base`,
    rarity: 1,
    mods: {},
    weight: 8,
    effect: {
        kind: `onHit`,
        chance: .15,
        perSec: 30,
        proc: {
            kind: `burn`,
            share: .8,
            seconds: 3
        }
    }
}, {
    id: `compost-tea`,
    tier: `base`,
    rarity: 1,
    mods: {
        growth: .06
    },
    weight: 8
}, {
    id: `copper-spoon`,
    tier: `base`,
    rarity: 0,
    mods: {
        magnet: .1
    },
    weight: 10
}, {
    id: `coupon-book`,
    tier: `base`,
    rarity: 1,
    mods: {
        chestDiscount: .12
    },
    weight: 6
}, {
    id: `crit-chip`,
    tier: `base`,
    rarity: 2,
    mods: {
        critDamage: .25
    },
    weight: 6
}, {
    id: `cursed-crown`,
    tier: `base`,
    rarity: 4,
    mods: {
        curse: .25,
        might: .3,
        luck: .2
    },
    weight: 1
}, {
    id: `extra-eye`,
    tier: `base`,
    rarity: 3,
    mods: {
        amount: 1
    },
    maxStacks: 3,
    weight: 3
}, {
    id: `freezer-burn`,
    tier: `base`,
    rarity: 2,
    mods: {},
    weight: 6,
    effect: {
        kind: `onKill`,
        chance: 1,
        perSec: 6,
        frozenOnly: !0,
        proc: {
            kind: `shatter`,
            radius: 34,
            share: .3,
            status: {
                kind: `freeze`,
                seconds: 1
            }
        }
    }
}, {
    id: `ghost-pepper`,
    tier: `base`,
    rarity: 2,
    mods: {
        dashGrace: .15
    },
    maxStacks: 1,
    weight: 6
}, {
    id: `ghost-skin`,
    tier: `base`,
    rarity: 2,
    mods: {
        evasion: .05
    },
    weight: 6
}, {
    id: `golden-gravy`,
    tier: `base`,
    rarity: 3,
    mods: {
        might: .15,
        greed: .15
    },
    weight: 3
}, {
    id: `heavy-russet`,
    tier: `base`,
    rarity: 4,
    mods: {},
    maxStacks: 5,
    weight: 1,
    effect: {
        kind: `onHit`,
        chance: .02,
        perSec: 8,
        proc: {
            kind: `bonk`,
            mult: 15
        }
    }
}, {
    id: `hot-pepper`,
    tier: `base`,
    rarity: 0,
    mods: {
        critChance: .03
    },
    weight: 10
}, {
    id: `lucky-peel`,
    tier: `base`,
    rarity: 0,
    mods: {
        luck: .05
    },
    weight: 10
}, {
    id: `penny-spud`,
    tier: `base`,
    rarity: 0,
    mods: {
        greed: .08
    },
    weight: 10
}, {
    id: `philosophers-potato`,
    tier: `base`,
    rarity: 4,
    mods: {
        might: .1,
        area: .1,
        speed: .1,
        duration: .1
    },
    weight: 1
}, {
    id: `pickle-jar`,
    tier: `base`,
    rarity: 0,
    mods: {
        recovery: .1
    },
    weight: 10
}, {
    id: `porcupine-spud`,
    tier: `base`,
    rarity: 1,
    mods: {},
    weight: 8,
    effect: {
        kind: `onHurt`,
        cooldown: .7,
        proc: {
            kind: `quills`,
            count: 10,
            damage: 30,
            thornsShare: 1,
            speed: 220,
            pierce: 2,
            life: .6
        }
    }
}, {
    id: `salt-crystal`,
    tier: `base`,
    rarity: 0,
    mods: {
        might: .04
    },
    weight: 10
}, {
    id: `second-spud`,
    tier: `base`,
    rarity: 4,
    mods: {
        revival: 1
    },
    maxStacks: 2,
    weight: 1
}, {
    id: `sharp-peeler`,
    tier: `base`,
    rarity: 2,
    mods: {
        pierce: 1
    },
    weight: 5
}, {
    id: `spicy-croquette`,
    tier: `base`,
    rarity: 2,
    mods: {},
    weight: 6,
    effect: {
        kind: `onHit`,
        chance: .12,
        perSec: 12,
        proc: {
            kind: `blast`,
            radius: 32,
            share: .8
        }
    }
}, {
    id: `spud-muffin`,
    tier: `base`,
    rarity: 0,
    mods: {
        maxHp: 10
    },
    weight: 10
}, {
    id: `starch-sock`,
    tier: `base`,
    rarity: 0,
    mods: {
        moveSpeed: .04
    },
    weight: 10
}, {
    id: `static-tot`,
    tier: `base`,
    rarity: 1,
    mods: {},
    weight: 8,
    effect: {
        kind: `onHit`,
        chance: .1,
        perSec: 16,
        proc: {
            kind: `chain`,
            jumps: 3,
            range: 70,
            share: .9
        }
    }
}, {
    id: `thorny-jacket`,
    tier: `base`,
    rarity: 1,
    mods: {
        thorns: 8
    },
    weight: 8
}, {
    id: `time-tuber`,
    tier: `base`,
    rarity: 3,
    mods: {
        duration: .15,
        speed: .08
    },
    weight: 3
}, {
    id: `vampire-tot`,
    tier: `base`,
    rarity: 1,
    mods: {
        healOnKill: .15
    },
    weight: 8
}, {
    id: `wandering-eyes`,
    tier: `base`,
    rarity: 2,
    mods: {},
    weight: 6,
    effect: {
        kind: `onKill`,
        chance: .2,
        perSec: 8,
        frozenOnly: !1,
        proc: {
            kind: `seekers`,
            count: 2,
            share: .4,
            speed: 140,
            turn: 7,
            life: 2.5
        }
    }
}, {
    id: `wide-ladle`,
    tier: `base`,
    rarity: 1,
    mods: {
        area: .06
    },
    weight: 8
}]
  , Te = [{
    id: `all-seeing-spud`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onKill`,
        chance: .35,
        perSec: 8,
        frozenOnly: !1,
        proc: {
            kind: `seekers`,
            count: 4,
            share: .4,
            speed: 170,
            turn: 9,
            life: 3,
            pierce: 2
        }
    },
    from: `wandering-eyes`,
    catalyst: `four-eyed-spud`
}, {
    id: `bonfire-spud`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onHit`,
        chance: .25,
        perSec: 20,
        proc: {
            kind: `burn`,
            share: .6,
            seconds: 4,
            spread: {
                radius: 40
            }
        }
    },
    from: `coal-baked-spud`,
    catalyst: `hot-sauce`
}, {
    id: `fry-volcano`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onHurt`,
        cooldown: .5,
        proc: {
            kind: `quills`,
            count: 24,
            damage: 30,
            thornsShare: 1.5,
            speed: 260,
            pierce: 5,
            life: .8,
            blast: {
                radius: 56,
                share: 2
            }
        }
    },
    from: `porcupine-spud`,
    catalyst: `starch-plating`
}, {
    id: `glacier-spud`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onKill`,
        chance: .3,
        perSec: 10,
        frozenOnly: !1,
        proc: {
            kind: `shatter`,
            radius: 48,
            share: .4,
            status: {
                kind: `freeze`,
                seconds: 1.5
            },
            frost: {
                radius: 84,
                status: {
                    kind: `slow`,
                    factor: .5,
                    seconds: 2
                }
            }
        }
    },
    from: `freezer-burn`,
    catalyst: `slow-cooker`
}, {
    id: `kaboom-spud`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onKill`,
        chance: .25,
        perSec: 10,
        frozenOnly: !1,
        proc: {
            kind: `blast`,
            radius: 48,
            share: .5
        }
    },
    from: `boom-spud`,
    catalyst: `rotten-spud`
}, {
    id: `magma-croquette`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onHit`,
        chance: .2,
        perSec: 8,
        proc: {
            kind: `blast`,
            radius: 44,
            share: .9,
            burn: {
                share: .3,
                seconds: 3
            }
        }
    },
    from: `spicy-croquette`,
    catalyst: `big-bowl`
}, {
    id: `meteor-russet`,
    tier: `evolved`,
    rarity: 4,
    mods: {},
    effect: {
        kind: `onHit`,
        chance: .03,
        perSec: 3,
        proc: {
            kind: `bonk`,
            mult: 20,
            meteor: {
                radius: 56,
                share: 1.5
            }
        }
    },
    from: `heavy-russet`,
    catalyst: `masher-grip`
}, {
    id: `storm-tot`,
    tier: `evolved`,
    rarity: 3,
    mods: {},
    effect: {
        kind: `onHit`,
        chance: .15,
        perSec: 12,
        proc: {
            kind: `chain`,
            jumps: 6,
            range: 90,
            share: .8,
            clap: {
                radius: 24,
                share: .4
            }
        }
    },
    from: `static-tot`,
    catalyst: `root-network`
}]
  , Ee = [{
    id: `aphid`,
    behavior: {
        kind: `chase`
    },
    hp: 6,
    speed: 42,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `beetle-brood`,
    behavior: {
        kind: `chase`
    },
    hp: 16,
    speed: 46,
    damage: 7,
    radius: 4,
    xp: 1,
    goldChance: .02,
    mass: 0
}, {
    id: `blight-spore`,
    behavior: {
        kind: `ranged`,
        range: 120,
        shotEvery: 3.4,
        pattern: {
            kind: `ring`,
            count: 6,
            speed: 50,
            radius: 3,
            damage: 7,
            bursts: 1,
            interval: .3,
            telegraph: .6
        }
    },
    hp: 40,
    speed: 26,
    damage: 10,
    radius: 7,
    xp: 4,
    goldChance: .08,
    mass: .3
}, {
    id: `bog-slime`,
    behavior: {
        kind: `chase`
    },
    hp: 11,
    speed: 26,
    damage: 4,
    radius: 6,
    xp: 1,
    goldChance: .03,
    mass: .1
}, {
    id: `bog-toad`,
    behavior: {
        kind: `charger`,
        dashSpeed: 170,
        dashRange: 100
    },
    hp: 50,
    speed: 28,
    damage: 13,
    radius: 8,
    xp: 4,
    goldChance: .08,
    mass: .4
}, {
    id: `bowling-ball`,
    behavior: {
        kind: `charger`,
        dashSpeed: 210,
        dashRange: 120
    },
    hp: 28,
    speed: 26,
    damage: 8,
    radius: 6,
    xp: 2,
    goldChance: .06,
    mass: .6
}, {
    id: `bowling-pin`,
    behavior: {
        kind: `chase`
    },
    hp: 10,
    speed: 30,
    damage: 4,
    radius: 5,
    xp: 1,
    goldChance: .03,
    mass: .3
}, {
    id: `cave-grub`,
    behavior: {
        kind: `chase`
    },
    hp: 24,
    speed: 32,
    damage: 6,
    radius: 6,
    xp: 2,
    goldChance: .05,
    mass: .2
}, {
    id: `compost-maggot`,
    behavior: {
        kind: `chase`
    },
    hp: 8,
    speed: 32,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `crumb-ant`,
    behavior: {
        kind: `chase`
    },
    hp: 6,
    speed: 46,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `dumpster-raccoon`,
    behavior: {
        kind: `charger`,
        dashSpeed: 170,
        dashRange: 100
    },
    hp: 24,
    speed: 34,
    damage: 7,
    radius: 6,
    xp: 2,
    goldChance: .08,
    mass: .3
}, {
    id: `field-crow`,
    behavior: {
        kind: `charger`,
        dashSpeed: 190,
        dashRange: 110
    },
    hp: 38,
    speed: 40,
    damage: 12,
    radius: 7,
    xp: 4,
    goldChance: .08,
    mass: .2
}, {
    id: `field-rat`,
    behavior: {
        kind: `chase`
    },
    hp: 42,
    speed: 50,
    damage: 11,
    radius: 6,
    xp: 4,
    goldChance: .08,
    mass: .2
}, {
    id: `frost-flea`,
    behavior: {
        kind: `chase`
    },
    hp: 7,
    speed: 40,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `fry-fly`,
    behavior: {
        kind: `chase`
    },
    hp: 14,
    speed: 54,
    damage: 5,
    radius: 5,
    xp: 2,
    goldChance: .05,
    mass: 0
}, {
    id: `garden-slug`,
    behavior: {
        kind: `tank`
    },
    hp: 34,
    speed: 22,
    damage: 7,
    radius: 7,
    xp: 2,
    goldChance: .06,
    mass: .4
}, {
    id: `golden-scarab`,
    behavior: {
        kind: `flee`,
        goldPerHit: 2,
        escapeAfter: 25
    },
    hp: 300,
    speed: 40,
    damage: 0,
    radius: 7,
    xp: 10,
    goldChance: 1,
    mass: .5
}, {
    id: `grease-fiend`,
    behavior: {
        kind: `charger`,
        dashSpeed: 220,
        dashRange: 130
    },
    hp: 200,
    speed: 40,
    damage: 22,
    radius: 9,
    xp: 12,
    goldChance: .18,
    mass: .5
}, {
    id: `gull-flock`,
    behavior: {
        kind: `swarm`
    },
    hp: 10,
    speed: 105,
    damage: 5,
    radius: 4,
    xp: 1,
    goldChance: .02,
    mass: 0
}, {
    id: `harvest-mouse`,
    behavior: {
        kind: `splitter`,
        splitInto: 3,
        child: `field-rat`
    },
    hp: 95,
    speed: 44,
    damage: 14,
    radius: 7,
    xp: 7,
    goldChance: .12,
    mass: .3
}, {
    id: `hay-bale`,
    behavior: {
        kind: `wall`
    },
    hp: 400,
    speed: 9,
    damage: 14,
    radius: 8,
    xp: 3,
    goldChance: .05,
    mass: 1
}, {
    id: `ice-imp`,
    behavior: {
        kind: `ranged`,
        range: 130,
        shotEvery: 2.6,
        pattern: {
            kind: `fan`,
            count: 3,
            arc: .5,
            speed: 85,
            radius: 2.5,
            damage: 10,
            bursts: 1,
            interval: .3,
            telegraph: .5
        }
    },
    hp: 90,
    speed: 34,
    damage: 14,
    radius: 7,
    xp: 7,
    goldChance: .12,
    mass: .3
}, {
    id: `ketchup-drop`,
    behavior: {
        kind: `chase`
    },
    hp: 9,
    speed: 30,
    damage: 4,
    radius: 5,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `lint-bunny`,
    behavior: {
        kind: `chase`
    },
    hp: 8,
    speed: 36,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .05,
    mass: 0
}, {
    id: `little-grey`,
    behavior: {
        kind: `chase`
    },
    hp: 9,
    speed: 40,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .04,
    mass: 0
}, {
    id: `lost-saucer`,
    behavior: {
        kind: `flee`,
        goldPerHit: 2,
        escapeAfter: 20
    },
    hp: 260,
    speed: 40,
    damage: 0,
    radius: 8,
    xp: 10,
    goldChance: 1,
    mass: .5
}, {
    id: `maggot-swarm`,
    behavior: {
        kind: `chase`
    },
    hp: 30,
    speed: 50,
    damage: 10,
    radius: 4,
    xp: 1,
    goldChance: .02,
    mass: 0
}, {
    id: `mole`,
    behavior: {
        kind: `tank`
    },
    hp: 110,
    speed: 30,
    damage: 16,
    radius: 9,
    xp: 7,
    goldChance: .12,
    mass: .6
}, {
    id: `mud-golem`,
    behavior: {
        kind: `tank`
    },
    hp: 260,
    speed: 28,
    damage: 22,
    radius: 11,
    xp: 12,
    goldChance: .18,
    mass: .8
}, {
    id: `oil-drip`,
    behavior: {
        kind: `chase`
    },
    hp: 9,
    speed: 30,
    damage: 4,
    radius: 5,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `parking-gull`,
    behavior: {
        kind: `chase`
    },
    hp: 7,
    speed: 48,
    damage: 3,
    radius: 4,
    xp: 1,
    goldChance: .04,
    mass: 0
}, {
    id: `potato-beetle`,
    behavior: {
        kind: `chase`
    },
    hp: 20,
    speed: 36,
    damage: 6,
    radius: 6,
    xp: 2,
    goldChance: .05,
    mass: .2
}, {
    id: `reset-zombie`,
    behavior: {
        kind: `tank`
    },
    hp: 80,
    speed: 21,
    damage: 12,
    radius: 7,
    xp: 5,
    goldChance: .1,
    mass: .5
}, {
    id: `sand-crab`,
    behavior: {
        kind: `charger`,
        dashSpeed: 150,
        dashRange: 90
    },
    hp: 20,
    speed: 30,
    damage: 7,
    radius: 6,
    xp: 2,
    goldChance: .06,
    mass: .3
}, {
    id: `sizzle-imp`,
    behavior: {
        kind: `exploder`,
        fuse: .6,
        blast: 26
    },
    hp: 30,
    speed: 48,
    damage: 20,
    radius: 6,
    xp: 4,
    goldChance: .08,
    mass: .1
}, {
    id: `snow-mold`,
    behavior: {
        kind: `splitter`,
        splitInto: 2
    },
    hp: 22,
    speed: 30,
    damage: 6,
    radius: 6,
    xp: 2,
    goldChance: .05,
    mass: .2
}, {
    id: `sock-pile`,
    behavior: {
        kind: `splitter`,
        splitInto: 3,
        child: `lint-bunny`
    },
    hp: 24,
    speed: 30,
    damage: 6,
    radius: 6,
    xp: 2,
    goldChance: .06,
    mass: .2
}, {
    id: `spittlebug`,
    behavior: {
        kind: `ranged`,
        range: 110,
        shotEvery: 3.4,
        pattern: {
            kind: `aimed`,
            count: 1,
            speed: 75,
            radius: 2,
            damage: 4,
            bursts: 3,
            interval: .2,
            telegraph: .5
        }
    },
    hp: 18,
    speed: 30,
    damage: 5,
    radius: 5,
    xp: 2,
    goldChance: .06,
    mass: .1
}, {
    id: `sprout-mite`,
    behavior: {
        kind: `chase`
    },
    hp: 8,
    speed: 34,
    damage: 3,
    radius: 5,
    xp: 1,
    goldChance: .03,
    mass: 0
}, {
    id: `swarm-fly`,
    behavior: {
        kind: `swarm`
    },
    hp: 10,
    speed: 100,
    damage: 5,
    radius: 4,
    xp: 1,
    goldChance: .02,
    mass: 0
}, {
    id: `tomato-leech`,
    behavior: {
        kind: `chase`
    },
    hp: 20,
    speed: 38,
    damage: 6,
    radius: 5,
    xp: 2,
    goldChance: .05,
    mass: .1
}, {
    id: `wireworm-larva`,
    behavior: {
        kind: `chase`
    },
    hp: 18,
    speed: 40,
    damage: 6,
    radius: 5,
    xp: 2,
    goldChance: .05,
    mass: .1
}]
  , De = [{
    id: `amusing`,
    hp: 650,
    speed: 32,
    damage: 24,
    radius: 16,
    attack: {
        kind: `hug`,
        radius: 40,
        leapTime: .55
    },
    attackEvery: 3.6,
    telegraph: 1.1,
    patternEvery: 2.2,
    patterns: [{
        kind: `fan`,
        count: 5,
        arc: 1,
        speed: 70,
        radius: 3,
        damage: 6,
        bursts: 2,
        interval: .4,
        telegraph: .8
    }, {
        kind: `ring`,
        count: 12,
        speed: 55,
        radius: 3.5,
        damage: 6,
        bursts: 2,
        interval: .6,
        telegraph: .9
    }, {
        kind: `spiral`,
        count: 2,
        spin: 2.6,
        speed: 65,
        radius: 2.5,
        damage: 4,
        bursts: 12,
        interval: .12,
        telegraph: .8
    }],
    xp: 40
}, {
    id: `beetle-queen`,
    hp: 700,
    speed: 30,
    damage: 14,
    radius: 16,
    attackEvery: 5,
    telegraph: 1,
    attack: {
        kind: `summon`,
        count: 8,
        ringRadius: 36,
        minion: `beetle-brood`
    },
    patternEvery: 2.8,
    patterns: [{
        kind: `aimed`,
        count: 2,
        speed: 80,
        radius: 2.5,
        damage: 7,
        bursts: 3,
        interval: .25,
        telegraph: .6
    }],
    xp: 40
}, {
    id: `compost-titan`,
    hp: 9e3,
    speed: 24,
    damage: 30,
    radius: 22,
    attackEvery: 4,
    telegraph: 1,
    attack: {
        kind: `summon`,
        count: 14,
        ringRadius: 44,
        minion: `maggot-swarm`
    },
    patternEvery: 3.6,
    patterns: [{
        kind: `spiral`,
        count: 4,
        spin: 1.2,
        speed: 55,
        radius: 3.5,
        damage: 12,
        bursts: 12,
        interval: .18,
        telegraph: 1,
        motion: {
            home: {
                rate: .8,
                after: .4,
                until: 1.4
            }
        }
    }],
    xp: 200
}, {
    id: `deep-freezer`,
    hp: 6200,
    speed: 28,
    damage: 24,
    radius: 18,
    attackEvery: 3.4,
    telegraph: .9,
    attack: {
        kind: `slam`,
        radius: 40,
        count: 3,
        spread: 70
    },
    patternEvery: 2.4,
    patterns: [{
        kind: `fan`,
        count: 9,
        arc: 1.4,
        speed: 110,
        radius: 2.5,
        damage: 16,
        bursts: 1,
        interval: .3,
        telegraph: .8,
        onHit: {
            kind: `slow`,
            factor: .5,
            seconds: 1.5
        },
        motion: {
            turn: {
                kind: `curve`,
                rate: 1,
                until: 1
            },
            mirror: `inward`
        }
    }],
    xp: 150
}, {
    id: `fryer-king`,
    hp: 3300,
    speed: 30,
    damage: 22,
    radius: 17,
    attackEvery: 3,
    telegraph: .9,
    attack: {
        kind: `pools`,
        shape: `splat`,
        count: 4,
        radius: 24,
        spread: 80,
        poolTime: 4,
        poolDps: 12
    },
    patternEvery: 3,
    patterns: [{
        kind: `ring`,
        count: 18,
        speed: 95,
        radius: 3,
        damage: 16,
        bursts: 2,
        interval: .35,
        telegraph: .9
    }],
    xp: 100
}, {
    id: `grater-golem`,
    hp: 7400,
    speed: 34,
    damage: 40,
    radius: 16,
    attackEvery: 3,
    telegraph: 1,
    attack: {
        kind: `charge`,
        dashSpeed: 320,
        dashTime: .9,
        width: 26
    },
    patternEvery: 3,
    patterns: [{
        kind: `ring`,
        count: 14,
        speed: 90,
        radius: 2.5,
        damage: 14,
        bursts: 1,
        interval: .3,
        telegraph: .8,
        motion: {
            weave: {
                px: 10,
                hz: 1.2
            },
            mirror: `alternate`
        }
    }],
    xp: 170
}, {
    id: `great-wireworm`,
    hp: 4200,
    speed: 40,
    damage: 26,
    radius: 14,
    attackEvery: 4,
    telegraph: 1,
    attack: {
        kind: `burrow`,
        radius: 40,
        under: 1.2
    },
    patternEvery: 3,
    patterns: [{
        kind: `fan`,
        count: 5,
        arc: .8,
        speed: 90,
        radius: 3,
        damage: 12,
        bursts: 2,
        interval: .3,
        telegraph: .7,
        motion: {
            speed: [{
                at: .6,
                to: .5
            }]
        }
    }],
    xp: 120
}, {
    id: `harvester`,
    hp: 16e3,
    speed: 36,
    damage: 60,
    radius: 22,
    attackEvery: 2.6,
    telegraph: 1,
    attack: {
        kind: `charge`,
        dashSpeed: 380,
        dashTime: 1.1,
        width: 70
    },
    patternEvery: 2.4,
    patterns: [{
        kind: `aimed`,
        count: 4,
        speed: 140,
        radius: 2.5,
        damage: 16,
        bursts: 3,
        interval: .25,
        telegraph: .7,
        motion: {
            home: {
                rate: 1.6,
                after: .1,
                until: .6
            }
        }
    }, {
        kind: `ring`,
        count: 24,
        speed: 85,
        radius: 2.5,
        damage: 12,
        bursts: 2,
        interval: .4,
        telegraph: .9,
        motion: {
            speed: [{
                at: .4,
                to: .2
            }, {
                at: .9,
                to: .2
            }, {
                at: 1.2,
                to: 1.6
            }]
        }
    }],
    xp: 300
}, {
    id: `ketchup-kraken`,
    hp: 11e3,
    speed: 22,
    damage: 34,
    radius: 20,
    attackEvery: 3,
    telegraph: 1.1,
    attack: {
        kind: `slam`,
        radius: 32,
        count: 5,
        spread: 80
    },
    patternEvery: 2.8,
    patterns: [{
        kind: `fan`,
        count: 9,
        arc: 1.6,
        speed: 95,
        radius: 3,
        damage: 14,
        bursts: 2,
        interval: .4,
        telegraph: .8,
        motion: {
            turn: {
                kind: `swirl`,
                rate: 2,
                until: 1.2
            },
            speed: [{
                at: 1.2,
                to: 1.3
            }],
            mirror: `alternate`
        }
    }],
    xp: 230
}, {
    id: `late-blight`,
    hp: 2e3,
    speed: 26,
    damage: 16,
    radius: 18,
    attackEvery: 4,
    telegraph: 1.2,
    attack: {
        kind: `pools`,
        shape: `clover`,
        count: 5,
        radius: 26,
        spread: 90,
        poolTime: 5,
        poolDps: 9
    },
    patternEvery: 3.5,
    patterns: [{
        kind: `spiral`,
        count: 3,
        spin: 1.6,
        speed: 45,
        radius: 3.5,
        damage: 7,
        bursts: 10,
        interval: .2,
        telegraph: .9
    }],
    xp: 80
}, {
    id: `sir-strawman`,
    hp: 2600,
    speed: 36,
    damage: 18,
    radius: 15,
    attackEvery: 2.6,
    telegraph: .8,
    attack: {
        kind: `charge`,
        dashSpeed: 280,
        dashTime: .7,
        width: 22
    },
    patternEvery: 2.6,
    patterns: [{
        kind: `fan`,
        count: 7,
        arc: 1.1,
        speed: 120,
        radius: 2.5,
        damage: 14,
        bursts: 1,
        interval: .3,
        telegraph: .8
    }],
    xp: 90
}, {
    id: `the-mandoline`,
    hp: 5200,
    speed: 32,
    damage: 34,
    radius: 16,
    attackEvery: 3.4,
    telegraph: 1.1,
    attack: {
        kind: `sweep`,
        lanes: 3,
        width: 22,
        length: 360
    },
    patternEvery: 3.4,
    patterns: [{
        kind: `spiral`,
        count: 3,
        spin: -2.2,
        speed: 55,
        radius: 2,
        damage: 10,
        bursts: 14,
        interval: .1,
        telegraph: .8,
        motion: {
            speed: [{
                at: .9,
                to: 1.8
            }]
        }
    }],
    xp: 140
}, {
    id: `the-masher`,
    hp: 1300,
    speed: 34,
    damage: 15,
    radius: 15,
    attackEvery: 3.2,
    telegraph: 1.2,
    attack: {
        kind: `slam`,
        radius: 38,
        count: 1
    },
    patternEvery: 3,
    patterns: [{
        kind: `ring`,
        count: 10,
        speed: 70,
        radius: 2.5,
        damage: 9,
        bursts: 1,
        interval: .3,
        telegraph: .7
    }],
    xp: 60
}]
  , Oe = [{
    id: `chip-canyons`,
    placement: {
        kind: `climate`,
        temperature: 2,
        moisture: 0
    },
    enemies: [[`crumb-ant`, `oil-drip`], [`sand-crab`], [`field-crow`, `sizzle-imp`], [`harvest-mouse`], [`grease-fiend`]],
    hazard: null,
    props: [`chip-stack`, `boulder`, `dry-bush`],
    propsPerChunk: 12,
    poiWeights: {
        dog: 2.2,
        paidChest: 4,
        chargeShrine: 3,
        crops: 1,
        vendor: 3,
        microwave: 1,
        curseShrine: 1,
        eliteNest: 2,
        bossLair: .5,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1.1,
    xpMult: 1.05
}, {
    id: `coin-laundromat`,
    placement: {
        kind: `landmark`,
        radius: 400,
        event: `loose-change`
    },
    enemies: [[`lint-bunny`], [`sock-pile`], [`field-rat`, `blight-spore`], [`ice-imp`], [`mud-golem`]],
    hazard: null,
    props: [`washer`, `dryer`, `laundry-cart`],
    propsPerChunk: 14,
    poiWeights: {
        dog: 2.2,
        microwave: 6,
        paidChest: 3,
        vendor: 1,
        chargeShrine: 1
    },
    poisPerChunk: 2,
    goldMult: 1.4,
    xpMult: 1.05
}, {
    id: `compost-caves`,
    placement: {
        kind: `climate`,
        temperature: 0,
        moisture: 1
    },
    enemies: [[`compost-maggot`], [`cave-grub`], [`field-rat`, `blight-spore`], [`mole`], [`mud-golem`]],
    hazard: {
        kind: `spores`,
        shape: `clover`,
        perChunk: 3,
        radius: 20,
        strength: 8
    },
    props: [`stalagmite`, `rot-pile`, `glow-shroom`],
    propsPerChunk: 14,
    poiWeights: {
        dog: 2.2,
        paidChest: 5,
        chargeShrine: 2,
        crops: 1,
        vendor: 1,
        microwave: 2,
        curseShrine: 3,
        eliteNest: 2,
        bossLair: .6,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1.15,
    xpMult: 1.15
}, {
    id: `crop-circle`,
    placement: {
        kind: `landmark`,
        radius: 460,
        event: `lost-saucer`
    },
    enemies: [[`little-grey`, `aphid`], [`spittlebug`], [`field-crow`, `blight-spore`], [`mole`], [`mud-golem`]],
    hazard: null,
    props: [`flattened-wheat`, `scorch-ring`, `probe-beacon`],
    propsPerChunk: 10,
    poiWeights: {
        dog: 2.2,
        crops: 6,
        chargeShrine: 4,
        paidChest: 2,
        curseShrine: 1
    },
    poisPerChunk: 2,
    goldMult: 1.1,
    xpMult: 1.2
}, {
    id: `frozen-tundra`,
    placement: {
        kind: `climate`,
        temperature: 0,
        moisture: 0
    },
    enemies: [[`frost-flea`], [`snow-mold`], [`field-rat`, `field-crow`], [`ice-imp`], [`mud-golem`]],
    hazard: {
        kind: `chill`,
        shape: `slab`,
        perChunk: 4,
        radius: 28,
        strength: .3
    },
    props: [`ice-fry`, `snow-drift`, `frozen-crate`],
    propsPerChunk: 10,
    poiWeights: {
        dog: 2.2,
        paidChest: 4,
        chargeShrine: 3,
        crops: 1,
        vendor: 2,
        microwave: 2,
        curseShrine: 1,
        eliteNest: 1,
        bossLair: .4,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1,
    xpMult: 1.15
}, {
    id: `fry-oil-desert`,
    placement: {
        kind: `climate`,
        temperature: 3,
        moisture: 0
    },
    enemies: [[`oil-drip`, `crumb-ant`], [`fry-fly`], [`sizzle-imp`], [`harvest-mouse`], [`grease-fiend`]],
    hazard: {
        kind: `burn`,
        shape: `oval`,
        perChunk: 3,
        radius: 22,
        strength: 10
    },
    props: [`cactus-fry`, `dune`, `oil-can`],
    propsPerChunk: 8,
    poiWeights: {
        dog: 2.2,
        paidChest: 5,
        chargeShrine: 2,
        crops: 1,
        vendor: 3,
        microwave: 1,
        curseShrine: 2,
        eliteNest: 1,
        bossLair: .5,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1.25,
    xpMult: 1
}, {
    id: `fry-palace`,
    placement: {
        kind: `landmark`,
        radius: 420,
        event: `lunch-rush`
    },
    enemies: [[`parking-gull`, `crumb-ant`], [`dumpster-raccoon`, `fry-fly`], [`field-rat`, `sizzle-imp`], [`harvest-mouse`], [`grease-fiend`]],
    hazard: {
        kind: `burn`,
        shape: `slab`,
        perChunk: 2,
        radius: 18,
        strength: 8
    },
    props: [`neon-sign`, `parking-cone`, `dumpster`, `drive-thru-menu`],
    propsPerChunk: 12,
    poiWeights: {
        dog: 2.2,
        vendor: 2.3,
        microwave: 3,
        paidChest: 2,
        chargeShrine: 1,
        curseShrine: 1
    },
    poisPerChunk: 2,
    goldMult: 1.2,
    xpMult: 1.15
}, {
    id: `gutterball-lanes`,
    placement: {
        kind: `landmark`,
        radius: 400,
        event: `strike`
    },
    enemies: [[`bowling-pin`, `crumb-ant`], [`bowling-ball`], [`field-rat`, `field-crow`], [`harvest-mouse`], [`mud-golem`]],
    hazard: {
        kind: `slow`,
        shape: `slab`,
        perChunk: 3,
        radius: 26,
        strength: .4
    },
    props: [`lane-arrow`, `ball-return`, `pin-deck`],
    propsPerChunk: 12,
    poiWeights: {
        dog: 2.2,
        paidChest: 5,
        curseShrine: 2,
        vendor: 2,
        chargeShrine: 1
    },
    poisPerChunk: 2,
    goldMult: 1.2,
    xpMult: 1.1
}, {
    id: `ketchup-bog`,
    placement: {
        kind: `climate`,
        temperature: 3,
        moisture: 1
    },
    enemies: [[`ketchup-drop`, `bog-slime`], [`tomato-leech`], [`bog-toad`, `sizzle-imp`], [`ice-imp`], [`grease-fiend`]],
    hazard: {
        kind: `burn`,
        shape: `drop`,
        perChunk: 4,
        radius: 24,
        strength: 8
    },
    props: [`tomato-vine`, `bubble`, `bottle`],
    propsPerChunk: 12,
    poiWeights: {
        dog: 2.2,
        paidChest: 5,
        chargeShrine: 2,
        crops: 1,
        vendor: 2,
        microwave: 2,
        curseShrine: 2,
        eliteNest: 2,
        bossLair: .6,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1.3,
    xpMult: 1.1
}, {
    id: `mash-swamp`,
    placement: {
        kind: `climate`,
        temperature: 2,
        moisture: 1
    },
    enemies: [[`bog-slime`, `ketchup-drop`], [`garden-slug`], [`bog-toad`], [`mole`], [`mud-golem`]],
    hazard: {
        kind: `slow`,
        shape: `oval`,
        perChunk: 4,
        radius: 30,
        strength: .45
    },
    props: [`reed`, `mash-mound`, `log`],
    propsPerChunk: 12,
    poiWeights: {
        dog: 2.2,
        paidChest: 4,
        chargeShrine: 2,
        crops: 2,
        vendor: 2,
        microwave: 2,
        curseShrine: 2,
        eliteNest: 1,
        bossLair: .4,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1.1,
    xpMult: 1.05
}, {
    id: `peel-forest`,
    placement: {
        kind: `climate`,
        temperature: 1,
        moisture: 1
    },
    enemies: [[`aphid`, `sprout-mite`], [`wireworm-larva`, `potato-beetle`], [`blight-spore`, `field-rat`], [`harvest-mouse`], [`mud-golem`]],
    hazard: {
        kind: `thorns`,
        shape: `splat`,
        perChunk: 3,
        radius: 18,
        strength: 6
    },
    props: [`peel-tree`, `bramble`, `mushroom`],
    propsPerChunk: 20,
    poiWeights: {
        dog: 2.2,
        paidChest: 4,
        chargeShrine: 3,
        crops: 2,
        vendor: 2,
        microwave: 1,
        curseShrine: 1,
        eliteNest: 2,
        bossLair: .4,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1,
    xpMult: 1.05
}, {
    id: `potato-field`,
    placement: {
        kind: `climate`,
        temperature: 1,
        moisture: 0
    },
    enemies: [[`sprout-mite`, `aphid`], [`potato-beetle`], [`field-crow`, `blight-spore`, `reset-zombie`], [`mole`], [`mud-golem`]],
    hazard: null,
    props: [`potato-plant`, `fence`, `hay-bale`],
    propsPerChunk: 14,
    poiWeights: {
        dog: 2.2,
        paidChest: 4,
        chargeShrine: 3,
        crops: 4,
        vendor: 2,
        microwave: 1,
        curseShrine: 1,
        eliteNest: 1,
        bossLair: .3,
        botDock: 1,
        whetstone: 1,
        dinnerBell: 1,
        taterSlots: 1,
        seedVault: .5,
        taterMagnet: 1,
        rootTunnel: .4,
        taterLantern: 3,
        spudFreezer: 1,
        frenzyFryer: 1,
        goldenShrine: .4,
        dogKennel: .5
    },
    poisPerChunk: 2,
    goldMult: 1,
    xpMult: 1
}]
  , ke = [{
    id: `beagle`,
    ability: {
        kind: `sniff`,
        every: 8,
        gold: 3
    },
    aura: {
        luck: .1
    },
    levelUps: [{
        every: .8,
        power: 1.4,
        aura: 1
    }, {
        every: .8,
        power: 1.4,
        aura: 1
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }],
    weight: 10,
    speed: 100,
    size: 5
}, {
    id: `collie`,
    ability: {
        kind: `herd`,
        radius: 46,
        push: 260,
        every: 2.5
    },
    aura: {
        moveSpeed: .03
    },
    levelUps: [{
        every: .8,
        power: 1.3,
        aura: 1
    }, {
        every: .8,
        power: 1.3,
        aura: 1
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }],
    weight: 10,
    speed: 120,
    size: 6
}, {
    id: `corgi`,
    ability: {
        kind: `bark`,
        radius: 60,
        stun: 1,
        every: 5
    },
    aura: {
        armor: 6
    },
    levelUps: [{
        every: .8,
        power: 1.3,
        aura: 1
    }, {
        every: .8,
        power: 1.3,
        aura: 1
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }],
    weight: 10,
    speed: 90,
    size: 5
}, {
    id: `dachshund`,
    ability: {
        kind: `dig`,
        every: 6,
        gold: 6,
        bonusChance: .2
    },
    aura: {
        greed: .08
    },
    levelUps: [{
        every: .8,
        power: 1.4,
        aura: 1
    }, {
        every: .8,
        power: 1.4,
        aura: 1
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }, {
        every: .9,
        power: 1.2,
        aura: .5
    }],
    weight: 10,
    speed: 80,
    size: 5
}, {
    id: `greyhound`,
    ability: {
        kind: `zoomies`,
        damage: 30,
        every: 4,
        length: 150
    },
    aura: {
        moveSpeed: .06
    },
    levelUps: [{
        every: .8,
        power: 1.5,
        aura: 1
    }, {
        every: .8,
        power: 1.5,
        aura: 1
    }, {
        every: .95,
        power: 1.25,
        aura: .5
    }, {
        every: .95,
        power: 1.25,
        aura: .5
    }],
    weight: 8,
    speed: 170,
    size: 6
}, ve, ye, {
    id: `retriever`,
    ability: {
        kind: `fetch`,
        radius: 120,
        every: 3
    },
    aura: {
        magnet: .1
    },
    levelUps: [{
        every: .8,
        power: 1.3,
        aura: 1
    }, {
        every: .8,
        power: 1.3,
        aura: 1
    }, {
        every: .9,
        power: 1.3,
        aura: .5
    }, {
        every: .9,
        power: 1.3,
        aura: .5
    }],
    weight: 12,
    speed: 95,
    size: 6
}, {
    id: `saint-bernard`,
    ability: {
        kind: `rescue`,
        heal: 25,
        threshold: .4,
        every: 20
    },
    aura: {
        recovery: .2
    },
    levelUps: [{
        every: .8,
        power: 1.4,
        aura: 1
    }, {
        every: .8,
        power: 1.4,
        aura: 1
    }, {
        every: .85,
        power: 1.2,
        aura: .5
    }, {
        every: .85,
        power: 1.2,
        aura: .5
    }],
    weight: 8,
    speed: 75,
    size: 8
}, {
    id: `terrier`,
    ability: {
        kind: `bite`,
        damage: 22,
        every: .9,
        range: 110
    },
    aura: {
        might: .03
    },
    levelUps: [{
        every: .8,
        power: 1.5,
        aura: 1
    }, {
        every: .8,
        power: 1.5,
        aura: 1
    }, {
        every: 1,
        power: 1.25,
        aura: .5
    }, {
        every: 1,
        power: 1.25,
        aura: .5
    }],
    weight: 12,
    speed: 140,
    size: 5
}, {
    id: `zelda-and-link`,
    ability: {
        kind: `eclipse`,
        every: 5,
        puff: he,
        puffBeats: 2,
        listen: ge,
        corona: {
            every: 50,
            radius: 110,
            bonus: .1,
            seconds: 1,
            charges: 1
        }
    },
    aura: {
        recovery: .15,
        luck: .06
    },
    levelUps: me,
    weight: 0,
    legendary: !0,
    speed: 100,
    size: 10
}]
  , Ae = [{
    id: `bale-ring`,
    effect: {
        kind: `wall`,
        enemy: `hay-bale`,
        count: 36,
        radius: 170,
        life: 22
    }
}, {
    id: `fly-swarm`,
    effect: {
        kind: `swarm`,
        enemy: `swarm-fly`,
        count: 26,
        width: 120
    }
}, {
    id: `golden-scarab`,
    effect: {
        kind: `lootRunner`,
        enemy: `golden-scarab`
    }
}, {
    id: `harvest-moon`,
    effect: {
        kind: `goldRush`,
        duration: 30,
        goldMult: 2
    }
}, {
    id: `loose-change`,
    effect: {
        kind: `goldRush`,
        duration: 20,
        goldMult: 2
    }
}, {
    id: `lost-saucer`,
    effect: {
        kind: `lootRunner`,
        enemy: `lost-saucer`
    }
}, {
    id: `lunch-rush`,
    effect: {
        kind: `swarm`,
        enemy: `gull-flock`,
        count: 24,
        width: 140
    }
}, {
    id: `strike`,
    effect: {
        kind: `wall`,
        enemy: `bowling-ball`,
        count: 10,
        radius: 200,
        life: 16
    }
}]
  , je = [{
    id: `bubbler`,
    help: {
        kind: `shield`,
        seconds: 3,
        healFraction: .2
    },
    weight: 2
}, {
    id: `gifter`,
    help: {
        kind: `gift`,
        coins: 6,
        coinsPerMin: 1.5,
        levelFraction: .4,
        beaconChance: .05
    },
    weight: 3
}, {
    id: `tidier`,
    help: {
        kind: `tidy`,
        radius: 600
    },
    weight: 2
}, {
    id: `zapper`,
    help: {
        kind: `zap`,
        targets: 6,
        radius: 120,
        eliteHpFraction: .15
    },
    weight: 3
}]
  , Me = [{
    id: `black`
}, {
    id: `brown`
}, {
    id: `red`
}, {
    id: `orange`
}, {
    id: `yellow`
}, {
    id: `green`
}, {
    id: `cyan`
}, {
    id: `blue`
}, {
    id: `violet`
}, {
    id: `magenta`
}, {
    id: `gray`
}]
  , Ne = [{
    id: `blob`,
    weight: 1
}, {
    id: `pebble`,
    weight: 1
}, {
    id: `bean`,
    weight: 1
}, {
    id: `egg`,
    weight: 1
}, {
    id: `squircle`,
    weight: 1
}, {
    id: `tablet`,
    weight: 1
}, {
    id: `capsule`,
    weight: 1
}, {
    id: `cylinder`,
    weight: 1
}, {
    id: `hex`,
    weight: 1
}, {
    id: `gem`,
    weight: 1
}, {
    id: `crystal`,
    weight: 1
}, {
    id: `wedge`,
    weight: 1
}, {
    id: `shield`,
    weight: 1
}, {
    id: `dome`,
    weight: 1
}, {
    id: `arch`,
    weight: 1
}, {
    id: `cloud`,
    weight: 1
}, {
    id: `teardrop`,
    weight: 1
}, {
    id: `leaf`,
    weight: 1
}, {
    id: `square`,
    weight: 1
}, {
    id: `sparkle`,
    weight: 1
}, {
    id: `clover`,
    weight: 1
}, {
    id: `flower`,
    weight: 1
}, {
    id: `heart`,
    weight: 1
}, {
    id: `house`,
    weight: 1
}, {
    id: `star`,
    weight: 1
}, {
    id: `pumpkin`,
    weight: .5,
    colors: [`orange`]
}]
  , Pe = {
    black: `#000000`,
    brown: `#936439`,
    red: `#ff263c`,
    orange: `#ff6700`,
    yellow: `#ff9800`,
    green: `#00c972`,
    cyan: `#00bca6`,
    blue: `#1084fe`,
    violet: `#9159fe`,
    magenta: `#ff309b`,
    gray: `#777777`
}
  , Fe = [{
    kind: `paidChest`,
    radius: 12
}, {
    kind: `chargeShrine`,
    radius: 26
}, {
    kind: `curseShrine`,
    radius: 18
}, {
    kind: `vendor`,
    radius: 18
}, {
    kind: `microwave`,
    radius: 20
}, {
    kind: `crops`,
    radius: 10
}, {
    kind: `eliteNest`,
    radius: 60
}, {
    kind: `bossLair`,
    radius: 110
}, {
    kind: `dog`,
    radius: 16
}, {
    kind: `botDock`,
    radius: 18
}, {
    kind: `whetstone`,
    radius: 20
}, {
    kind: `dinnerBell`,
    radius: 14
}, {
    kind: `taterSlots`,
    radius: 22
}, {
    kind: `seedVault`,
    radius: 24
}, {
    kind: `taterMagnet`,
    radius: 20
}, {
    kind: `rootTunnel`,
    radius: 20
}, {
    kind: `taterLantern`,
    radius: 12
}, {
    kind: `spudFreezer`,
    radius: 18
}, {
    kind: `frenzyFryer`,
    radius: 18
}, {
    kind: `goldenShrine`,
    radius: 26
}, {
    kind: `dogKennel`,
    radius: 20
}]
  , Ie = {
    paidChest: {
        color: `#c9a227`,
        pin: `crate`
    },
    chargeShrine: {
        color: `#7fd6ff`,
        pin: `spudShrine`
    },
    curseShrine: {
        color: `#9a6ad6`,
        pin: null
    },
    vendor: {
        color: `#ff8a65`,
        pin: `fries`
    },
    microwave: {
        color: `#b0bec5`,
        pin: `microwave`
    },
    crops: {
        color: `#8bc34a`,
        pin: null
    },
    eliteNest: {
        color: `#ff5252`,
        pin: null
    },
    bossLair: {
        color: `#ff1744`,
        pin: `skull`
    },
    dog: {
        color: `#f5deb3`,
        pin: `paw`
    },
    botDock: {
        color: `#64ffda`,
        pin: `bot`
    },
    whetstone: {
        color: `#8c9eff`,
        pin: `blade`
    },
    dinnerBell: {
        color: `#ffd740`,
        pin: null
    },
    taterSlots: {
        color: `#ff6e40`,
        pin: `seven`
    },
    seedVault: {
        color: `#9fcf6e`,
        pin: `sprout`
    },
    taterMagnet: {
        color: `#e57373`,
        pin: `magnet`
    },
    rootTunnel: {
        color: `#b5845a`,
        pin: `burrow`
    },
    taterLantern: {
        color: `#ffc857`,
        pin: null
    },
    spudFreezer: {
        color: `#9ee6ff`,
        pin: `snowflake`
    },
    frenzyFryer: {
        color: `#ffb347`,
        pin: `flame`
    },
    goldenShrine: {
        color: `#ffd04a`,
        pin: `goldenShrine`
    },
    dogKennel: {
        color: `#d7a86e`,
        pin: `paw`
    }
}
  , Le = [{
    minute: 0,
    minEnemies: 22,
    maxEnemies: 35,
    interval: .75,
    batch: 3,
    tiers: [8, 1, 0, 0, 0]
}, {
    minute: 1,
    minEnemies: 32,
    maxEnemies: 35,
    interval: .7,
    batch: 3,
    tiers: [8, 1, 0, 0, 0],
    elite: !0
}, {
    minute: 2,
    minEnemies: 45,
    maxEnemies: 100,
    interval: .65,
    batch: 4,
    tiers: [5, 1, 0, 0, 0],
    boss: `amusing`,
    events: [`fly-swarm`]
}, {
    minute: 3,
    minEnemies: 90,
    maxEnemies: 150,
    interval: .6,
    batch: 5,
    tiers: [1, 2, 0, 0, 0],
    elite: !0,
    boss: `beetle-queen`,
    events: [`golden-scarab`]
}, {
    minute: 4,
    minEnemies: 85,
    maxEnemies: 150,
    interval: .6,
    batch: 4,
    tiers: [1, 2, 1, 0, 0],
    boss: `the-masher`
}, {
    minute: 5,
    minEnemies: 105,
    maxEnemies: 165,
    interval: .55,
    batch: 5,
    tiers: [1, 2, 1, 0, 0],
    elite: !0,
    events: [`fly-swarm`]
}, {
    minute: 6,
    minEnemies: 125,
    maxEnemies: 180,
    interval: .5,
    batch: 5,
    tiers: [1, 1, 2, 0, 0],
    boss: `late-blight`,
    events: [`bale-ring`]
}, {
    minute: 7,
    minEnemies: 145,
    maxEnemies: 240,
    interval: .45,
    batch: 6,
    tiers: [0, 1, 2, 1, 0],
    elite: !0,
    boss: `sir-strawman`,
    events: [`golden-scarab`]
}, {
    minute: 8,
    minEnemies: 165,
    maxEnemies: 250,
    interval: .42,
    batch: 6,
    tiers: [0, 1, 2, 1, 0],
    boss: `fryer-king`,
    events: [`fly-swarm`, `harvest-moon`]
}, {
    minute: 9,
    minEnemies: 185,
    maxEnemies: 260,
    interval: .38,
    batch: 7,
    tiers: [0, 1, 1, 2, 0],
    elite: !0,
    events: [`bale-ring`]
}, {
    minute: 10,
    minEnemies: 210,
    maxEnemies: 270,
    interval: .35,
    batch: 7,
    tiers: [0, 0, 2, 2, 0],
    boss: `great-wireworm`,
    events: [`golden-scarab`]
}, {
    minute: 11,
    minEnemies: 235,
    maxEnemies: 280,
    interval: .32,
    batch: 8,
    tiers: [0, 0, 1, 2, 0],
    elite: !0,
    events: [`fly-swarm`]
}, {
    minute: 12,
    minEnemies: 260,
    maxEnemies: 290,
    interval: .3,
    batch: 8,
    tiers: [0, 0, 1, 2, 0],
    boss: `the-mandoline`
}, {
    minute: 13,
    minEnemies: 285,
    maxEnemies: 300,
    interval: .28,
    batch: 9,
    tiers: [0, 0, 1, 2, 0],
    elite: !0,
    events: [`bale-ring`]
}, {
    minute: 14,
    minEnemies: 305,
    maxEnemies: 320,
    interval: .26,
    batch: 9,
    tiers: [0, 0, 1, 4, 1],
    boss: `deep-freezer`,
    events: [`golden-scarab`]
}, {
    minute: 15,
    minEnemies: 330,
    maxEnemies: 350,
    interval: .24,
    batch: 10,
    tiers: [0, 0, 0, 2, 1],
    elite: !0,
    events: [`fly-swarm`, `harvest-moon`]
}, {
    minute: 16,
    minEnemies: 360,
    maxEnemies: 380,
    interval: .22,
    batch: 10,
    tiers: [0, 0, 0, 1, 1],
    boss: `grater-golem`,
    events: [`bale-ring`]
}, {
    minute: 17,
    minEnemies: 390,
    maxEnemies: 420,
    interval: .2,
    batch: 11,
    tiers: [0, 0, 0, 1, 2],
    elite: !0,
    boss: `compost-titan`,
    events: [`golden-scarab`]
}, {
    minute: 18,
    minEnemies: 420,
    maxEnemies: 450,
    interval: .18,
    batch: 12,
    tiers: [0, 0, 0, 1, 3],
    boss: `ketchup-kraken`,
    events: [`fly-swarm`]
}, {
    minute: 19,
    minEnemies: 450,
    maxEnemies: 480,
    interval: .16,
    batch: 12,
    tiers: [0, 0, 0, 0, 1],
    elite: !0,
    events: [`bale-ring`]
}, {
    minute: 20,
    minEnemies: 480,
    maxEnemies: 500,
    interval: .14,
    batch: 14,
    tiers: [0, 0, 0, 0, 1],
    boss: `harvester`,
    events: [`fly-swarm`]
}]
  , Re = {
    rows: Le,
    afterLast: `postWin`
}
  , ze = [`fryer-king`, `the-mandoline`, `the-masher`, `grater-golem`, `compost-titan`, `ketchup-kraken`, `harvester`]
  , Be = [`fly-swarm`, `bale-ring`]
  , Ve = {
    graceSec: 30,
    graceDensity: .8,
    rows: [{
        minEnemies: 34,
        maxEnemies: 35,
        interval: .75,
        batch: 3,
        tiers: [8, 1, 0, 0, 0]
    }, {
        minEnemies: 75,
        maxEnemies: 100,
        interval: .6,
        batch: 5,
        tiers: [2, 2, 0, 0, 0]
    }, {
        minEnemies: 75,
        maxEnemies: 100,
        interval: .65,
        batch: 4,
        tiers: [2, 1, 0, 0, 0]
    }]
}
  , He = {
    rows: [{
        ...Le[0],
        ...Ve.rows[0]
    }, ...Le.slice(1).map(e => Object.assign({}, e, Ve.rows[e.minute]))],
    afterLast: `postWin`
}
  , Ue = class extends Error {
    name = `MissingContent`
}
;
function D(e) {
    let t = new Map;
    for (let n of e) {
        if (t.has(n.id))
            throw new Ue(`Duplicate content id ${n.id}`);
        t.set(n.id, n)
    }
    return t
}
function We(e) {
    return new Map(e.map( (e, t) => [e.id, t]))
}
function O(e, t) {
    let n = e.get(t);
    if (n === void 0)
        throw new Ue(`Unknown content id ${String(t)}`);
    return n
}
function Ge(e, t) {
    let n = e[t];
    if (n === void 0)
        throw new Ue(`No content at index ${t}`);
    return n
}
var Ke = [...be, ...xe, ...Se]
  , qe = D(Ke)
  , Je = D(Ce)
  , Ye = [...we, ...Te]
  , Xe = D(Ye)
  , Ze = D(Ee)
  , Qe = D(De)
  , $e = D(Oe)
  , et = D(Ae)
  , tt = D(ke)
  , nt = We(Ee)
  , rt = We(De)
  , it = We(ke)
  , at = new Map(Fe.map(e => [e.kind, e]))
  , ot = new Map(xe.map(e => [e.from, e]))
  , st = Le.flatMap(e => e.boss === void 0 ? [] : [e.boss])
  , k = {
    weapon: e => O(qe, e),
    passive: e => O(Je, e),
    item: e => O(Xe, e),
    enemy: e => O(Ze, e),
    boss: e => O(Qe, e),
    biome: e => O($e, e),
    event: e => O(et, e),
    dog: e => O(tt, e),
    poi: e => O(at, e),
    enemyIndex: e => O(nt, e),
    bossIndex: e => O(rt, e),
    findEnemyIndex: e => function(e) {
        return Ze.has(e)
    }(e) ? nt.get(e) ?? -1 : -1,
    findBossIndex: e => function(e) {
        return Qe.has(e)
    }(e) ? rt.get(e) ?? -1 : -1,
    dogIndex: e => O(it, e),
    enemyAt: e => Ge(Ee, e),
    bossAt: e => Ge(De, e),
    dogAt: e => Ge(ke, e),
    botHelpAt: e => Ge(je, e),
    botShapeAt: e => Ge(Ne, e),
    botColorAt: e => Ge(Me, e),
    evolutionOf: e => ot.get(e),
    isWeaponId: e => qe.has(e),
    isItemId: e => Xe.has(e),
    isDogBreedId: e => tt.has(e),
    baseWeapons: be,
    allWeapons: Ke,
    evolutions: xe,
    unions: Se,
    passives: Ce,
    items: we,
    evolvedItems: Te,
    allItems: Ye,
    enemies: Ee,
    bosses: De,
    bossOrder: [...st.map(e => O(Qe, e)), ...De.filter(e => !st.includes(e.id))],
    biomes: Oe,
    events: Ae,
    dogs: ke,
    pois: Fe,
    botHelps: je,
    botShapes: Ne,
    botColors: Me,
    botLineCount: 6
}
  , ct = .3
  , lt = .7
  , ut = 1.3
  , dt = 42;
function ft(e, t) {
    return e.next() < t.chance
}
var pt = class {
    due;
    revealedTick = -1;
    knockedTick = -1;
    x = 0;
    y = 0;
    px = 0;
    py = 0;
    side = 1;
    head = `held`;
    headTicks = 0;
    headX = 0;
    headY = 0;
    fromX = 0;
    fromY = 0;
    crowd = 0;
    lured = 0;
    bursts = 0;
    constructor(e) {
        this.due = e
    }
}
;
function mt(e) {
    return e.revealedTick === -1 ? `pending` : e.due ? `joined` : `asleep`
}
function ht(e) {
    return mt(e) === `joined`
}
function gt(e) {
    return mt(e) === `asleep`
}
function _t(e) {
    return e.knockedTick !== -1
}
var vt = function() {
    let e = typeof document < `u` && document.createElement(`link`).relList;
    return e && e.supports && e.supports(`modulepreload`) ? `modulepreload` : `preload`
}()
  , yt = {}
  , A = function(e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
        let e, a = document.querySelector(`meta[property=csp-nonce]`), o = a?.nonce || a?.getAttribute(`nonce`);
        i = t.map(t => {
            t = function(e, t) {
                return new URL(e,t).href
            }(t, n);
            let r = (i = t,
            import.meta.resolve ? new URL(import.meta.resolve(i)) : new URL(i,import.meta.url));
            var i;
            let a = r.pathname.endsWith(`.css`);
            return function(t, n) {
                if (n in t)
                    return t[n];
                let i = ( () => {
                    if (e === void 0) {
                        e = {
                            all: new Set,
                            styles: new Set
                        };
                        let t = document.getElementsByTagName(`link`);
                        for (let n = t.length - 1; n >= 0; n--) {
                            let r = t[n];
                            e.all.add(r.href),
                            r.rel === `stylesheet` && e.styles.add(r.href)
                        }
                    }
                    if ((a ? e.styles : e.all).has(r.href))
                        return;
                    let t = document.createElement(`link`);
                    return t.rel = a ? `stylesheet` : vt,
                    a || (t.as = `script`),
                    t.crossOrigin = ``,
                    t.href = r.href,
                    o && t.setAttribute(`nonce`, o),
                    document.head.appendChild(t),
                    a ? new Promise( (e, n) => {
                        t.addEventListener(`load`, e),
                        t.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${r}`)))
                    }
                    ) : void 0
                }
                )();
                if (!i)
                    return void (t[n] = void 0);
                let s = i.then( () => {
                    t[n] = void 0
                }
                , e => {
                    throw t[n] = void 0,
                    e
                }
                );
                return t[n] = s,
                s
            }(yt, r.href)
        }
        ).filter(e => e !== void 0),
        r = Promise.all(i.map(e => Promise.resolve(e).then(e => ({
            status: `fulfilled`,
            value: e
        }), e => ({
            status: `rejected`,
            reason: e
        }))))
    }
    var i;
    function a(e) {
        let t = new Event(`vite:preloadError`,{
            cancelable: !0
        });
        if (t.payload = e,
        window.dispatchEvent(t),
        !t.defaultPrevented)
            throw e
    }
    return r.then(t => {
        for (let e of t || [])
            e.status === `rejected` && a(e.reason);
        return e().catch(a)
    }
    )
}
  , bt = k.bossIndex(`amusing`)
  , xt = {
    stage: async function(e) {
        await w();
        let {loadRevealStage: t} = await A(async () => {
            let {loadRevealStage: e} = await __tiboRetry(`./alex-reveal-scene-DyOzUoEf.js`);
            return {
                loadRevealStage: e
            }
        }
        , [], import.meta.url);
        return t({
            root: e.overlay.root,
            audio: e.audio,
            shake: e.shake,
            reducedMotion: () => e.motion.matches
        })
    },
    voice: async () => (await A(async () => {
        let {ALEX: e} = await __tiboRetry(`./speakers-CLTWVMY-.js`).then(e => e.r);
        return {
            ALEX: e
        }
    }
    , [], import.meta.url)).ALEX
};
function St() {
    return g._({
        id: `CfwKHG`,
        message: [`I'll get you next time, Tibo...`]
    })
}
function Ct() {
    return g._({
        id: `tXGHmN`,
        message: [`alright FINE i'll try chatjippity, lets kill some zombies`]
    })
}
var wt, Tt, Et = [function() {
    return g._({
        id: `bNaAN9`,
        message: [`no fair!! the suit was lagging`]
    })
}
, function() {
    return g._({
        id: `1G94Sc`,
        message: [`you just got lucky tibo. hmph`]
    })
}
], Dt = class {
    app;
    stage;
    voice;
    run;
    shownFor;
    line;
    heard = new WeakSet;
    joinLine = {
        say: () => {
            let e = this.app.game.state
              , [t,...n] = function(e) {
                return E.alexLine.poutModes.includes(e.mode) ? [...Et, Ct] : [Ct]
            }(e);
            t !== void 0 && this.sayLine(e, {
                text: t,
                kind: `scene`,
                rest: n
            })
        }
        ,
        holds: () => this.lineShows() && this.app.speaker.ready
    };
    constructor(e, t=xt) {
        this.app = e,
        e.speaker.onClosed.add(this.closed),
        this.voice = e.chunks.slot(t.voice),
        this.stage = e.chunks.slot( () => (e.speaker.prefetch(),
        this.voice.want(),
        t.stage(e)))
    }
    get playing() {
        return this.run !== void 0 || this.pending()
    }
    get live() {
        let {game: e, cutIn: t, renderer: n, pause: r} = this.app;
        return this.playing && e.choice === void 0 && !t.playing && !e.state.paused && !e.over && n.ready() && r === `none`
    }
    async ready() {
        this.stage.want(),
        await this.stage.settled,
        await this.voice.settled
    }
    frame(e, t) {
        let {game: n} = this.app
          , r = n.state;
        this.run === void 0 || !n.over && this.run.state === r || this.drop(),
        this.followLine(r, t),
        r.alex.due && !ht(r.alex) && r.tick > 0 && this.stage.want();
        let i = this.stage.value;
        this.run === void 0 && this.pending() && i !== void 0 && (this.shownFor = r,
        this.run = i.begin(r, this.joinLine));
        let a = this.run;
        a !== void 0 && (a.advance({
            dt: e,
            live: t && this.live
        }),
        a.done && this.drop())
    }
    view() {
        return this.run?.view() ?? null
    }
    skip() {
        let e = this.run;
        return !(e === void 0 || !this.live || !e.skip() || (this.drop(),
        0))
    }
    probe() {
        return {
            stage: this.stage.phase,
            playing: this.playing,
            live: this.live,
            tick: this.run?.tick ?? 0,
            end: this.run?.end ?? 0
        }
    }
    pending() {
        let {game: e} = this.app
          , t = e.state;
        return this.stage.value !== void 0 && this.shownFor !== t && !e.over && ht(t.alex) && t.alex.revealedTick === t.tick
    }
    followLine(e, t) {
        this.line !== void 0 && this.line.run !== e && (this.hush(),
        this.line = void 0),
        this.line === void 0 && !this.heard.has(e) && function(e) {
            let t = e.alex;
            return !t.due && (gt(t) || mt(t) === `pending` && function(e) {
                let t = e.bosses;
                for (let e = 0; e < t.pool.count; e++) {
                    let n = t.pool.slotAt(e);
                    if (t.pool.isAlive(n) && t.def[n] === bt)
                        return !0
                }
                return !1
            }(e))
        }(e) && (this.app.speaker.prefetch(),
        this.voice.want(),
        this.line = {
            step: `warm`,
            run: e
        }),
        this.line?.step === `warm` && t && function(e) {
            let t = e.alex;
            return gt(t) && e.tick - t.revealedTick >= dt
        }(e) && (this.app.audio.playSfx(`thud`, 1),
        this.heard.add(e),
        this.line = {
            step: `owed`,
            run: e
        }),
        this.app.game.over ? this.hush() : this.line?.step === `owed` && t && this.voice.value !== void 0 && this.sayLine(e, {
            text: St,
            kind: `auto`,
            rest: []
        })
    }
    sayLine(e, t) {
        let n = this.voice.value;
        if (n === void 0)
            return;
        let {alexLine: r} = E
          , i = {
            speaker: n,
            text: t.text(),
            mode: {
                kind: t.kind,
                holdSec: t.rest.length > 0 ? r.poutHoldSec : r.holdSec
            }
        };
        this.app.speaker.say(i),
        this.line = {
            step: `said`,
            run: e,
            speech: i,
            text: t.text,
            kind: t.kind,
            rest: t.rest
        }
    }
    closed = e => {
        let t = this.line;
        if (t?.step !== `said` || t.speech !== e)
            return;
        let[n,...r] = t.rest;
        n !== void 0 && this.sayLine(t.run, {
            text: n,
            kind: t.kind,
            rest: r
        })
    }
    ;
    relabel() {
        let e = this.line;
        e?.step === `said` && this.lineShows() && this.sayLine(e.run, {
            text: e.text,
            kind: e.kind,
            rest: e.rest
        })
    }
    lineShows() {
        let e = this.line;
        return e?.step === `said` && this.app.speaker.speech === e.speech
    }
    hush() {
        let e = this.line;
        if (e?.step !== `said`)
            return;
        let t = this.lineShows();
        this.line = {
            ...e,
            rest: []
        },
        t && this.app.speaker.close()
    }
    drop() {
        this.run?.close(),
        this.run = void 0,
        this.hush()
    }
}
, Ot = new WeakMap;
function kt(e) {
    wt === void 0 ? Tt?.push(e) : wt(e)
}
function At(e) {
    wt = e;
    for (let t of Tt ?? [])
        e(t);
    Tt = void 0
}
function jt() {
    return performance.now()
}
var Mt = [`pointerup`, `touchend`, `keydown`, `click`]
  , Nt = [`keydown`, `pointerdown`, `pointerup`, `touchend`]
  , Pt = new Set([`Escape`, `Shift`, `Control`, `Alt`, `AltGraph`, `Meta`, `OS`, `Fn`, `CapsLock`]);
function Ft() {
    return !(`userActivation` in navigator) || navigator.userActivation.isActive
}
function It(e) {
    return e instanceof KeyboardEvent && Pt.has(e.key)
}
var Lt = class {
    at = -1 / 0;
    constructor() {
        for (let e of Nt)
            window.addEventListener(e, this.mark, !0)
    }
    secondsSincePress() {
        return (performance.now() - this.at) / 1e3
    }
    mark = e => {
        (function(e) {
            return !(!e.isTrusted || It(e) || e instanceof PointerEvent && e.pointerType === `mouse` != (e.type === `pointerdown`))
        }
        )(e) && (this.at = performance.now())
    }
}
  , Rt = class {
    armed = !1;
    run;
    constructor(e) {
        this.run = e
    }
    arm(e) {
        if (e !== this.armed) {
            this.armed = e;
            for (let t of Mt)
                e ? window.addEventListener(t, this.fire, !0) : window.removeEventListener(t, this.fire, !0)
        }
    }
    fire = () => {
        this.run()
    }
}
  , zt = class {
    limits;
    visible = !1;
    readyAt = 1 / 0;
    press;
    constructor(e) {
        this.limits = e
    }
    get shown() {
        return this.visible
    }
    show(e) {
        this.visible || (this.visible = !0,
        this.readyAt = e + this.limits.armMs)
    }
    hide() {
        this.visible = !1,
        this.readyAt = 1 / 0,
        this.press = void 0
    }
    down(e) {
        let t = this.armedAt(e.at);
        this.press = {
            from: e,
            armed: t,
            strayed: !1
        },
        t || this.restart(e.at)
    }
    move(e) {
        let t = this.press;
        t === void 0 || t.from.id !== e.id || t.strayed || (t.strayed = Math.hypot(e.x - t.from.x, e.y - t.from.y) > this.limits.slopPx)
    }
    up(e) {
        this.move(e);
        let t = this.press;
        t?.from.id === e.id && e.at - t.from.at > this.limits.maxPressMs && (t.strayed = !0)
    }
    cancel(e) {
        this.press?.from.id === e && (this.press.strayed = !0)
    }
    drop() {
        this.press = void 0
    }
    click(e) {
        let t = this.press;
        return this.press = void 0,
        e.keyboard ? this.armedAt(e.at) ? this.opens(e.at) : (this.restart(e.at),
        !1) : t === void 0 ? (this.restart(e.at),
        !1) : t.armed && !t.strayed && this.opens(e.at)
    }
    opens(e) {
        return this.restart(e),
        !0
    }
    armedAt(e) {
        return this.visible && e >= this.readyAt
    }
    restart(e) {
        this.visible && (this.readyAt = Math.max(this.readyAt, e + this.limits.armMs))
    }
}
;
function Bt(e) {
    return {
        isOpen: () => !e.closed,
        focus: () => {
            e.focus()
        }
    }
}
function Vt(e) {
    let t = window.open(e, `_blank`);
    if (t !== null)
        return t.opener = null,
        Bt(t)
}
function Ht(e) {
    return Vt(e) !== void 0
}
var Ut = [`keydown`, `click`];
function Wt(e, t) {
    let n = r => {
        let i = t();
        if (!i || function(e) {
            return !It(e) && Ft()
        }(r)) {
            for (let e of Ut)
                window.removeEventListener(e, n, !0);
            i && (r.preventDefault(),
            r.stopPropagation(),
            Ht(e.url) && e.onOpen?.())
        }
    }
    ;
    for (let e of Ut)
        window.addEventListener(e, n, !0)
}
function Gt(e) {
    let t = document.createElement(`a`);
    return t.href = e.url,
    t.target = `_blank`,
    t.rel = `noopener noreferrer`,
    t.className = e.className,
    e.testId !== void 0 && (t.dataset.testid = e.testId),
    t
}
function Kt(e) {
    let t = Gt(e);
    return t.textContent = e.label,
    t.addEventListener(`click`, t => {
        e.onOpen?.(),
        Ht(e.url) && t.preventDefault()
    }
    ),
    t
}
var qt, Jt = new WeakMap;
function Yt(e) {
    for (let t of e) {
        let e = Jt.get(t.target);
        if (e === void 0)
            continue;
        if (t.isIntersecting) {
            e.show(t.time);
            continue
        }
        let n = e.shown && !t.target.isConnected;
        e.hide(),
        n && qt?.unobserve(t.target)
    }
}
function Xt(e) {
    return {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        at: e.timeStamp
    }
}
function Zt(e, t) {
    let n = new zt({
        armMs: t.armMs,
        slopPx: t.slopPx ?? 1 / 0,
        maxPressMs: t.maxPressMs ?? 1 / 0
    }), r;
    (function(e, t) {
        Jt.set(e, t),
        qt ??= new IntersectionObserver(Yt),
        qt.observe(e)
    }
    )(e, n),
    e.addEventListener(`pointerdown`, t => {
        r?.(),
        n.down(Xt(t)),
        r = function(e, t) {
            let n = e => {
                t.move(Xt(e))
            }
              , r = e => {
                t.up(Xt(e))
            }
              , i = e => {
                t.cancel(e.pointerId)
            }
              , a = () => {
                window.removeEventListener(`pointermove`, n),
                window.removeEventListener(`pointerup`, r),
                window.removeEventListener(`pointercancel`, i),
                window.removeEventListener(`pointerdown`, o, !0)
            }
              , o = n => {
                n.target instanceof Node && e.contains(n.target) || (t.drop(),
                a())
            }
            ;
            return window.addEventListener(`pointermove`, n),
            window.addEventListener(`pointerup`, r),
            window.addEventListener(`pointercancel`, i),
            window.addEventListener(`pointerdown`, o, !0),
            a
        }(e, n)
    }
    ),
    e.addEventListener(`click`, e => {
        r?.(),
        r = void 0;
        let i = n.click({
            at: e.timeStamp,
            keyboard: e.detail === 0
        });
        i && t.onOpen?.(),
        i && !Ht(t.url) || e.preventDefault()
    }
    )
}
function Qt(e) {
    let t = Gt(e);
    return t.textContent = e.label,
    Zt(t, e),
    t
}
function j(e) {}
function $t(e, t) {}
var en = [`xp`, `gold`, `heal`, `magnet`, `chest`, `reroll`, `skip`, `banish`, `item`, `beacon`]
  , tn = {
    xp: 0,
    gold: 1,
    heal: 2,
    magnet: 3,
    chest: 4,
    reroll: 5,
    skip: 6,
    banish: 7,
    item: 8,
    beacon: 9
}
  , nn = [`none`, `boss`, `elite`, `lootRunner`, `poteto`, `story`]
  , rn = {
    none: 0,
    boss: 1,
    elite: 2,
    lootRunner: 3,
    poteto: 4,
    story: 5
}
  , an = {
    aura: 0,
    pool: 1,
    mine: 2,
    nova: 3,
    strike: 4,
    telegraph: 5,
    hazardPool: 6
}
  , on = {
    circle: 0,
    line: 1,
    cone: 2
}
  , sn = [`slash`, `beam`, `explosion`, `strike`, `cone`, `reset`, `spawn`, `death`, `shockwave`, `chain`, `heal`, `pickup`, `bark`, `bite`, `gpuSteam`, `shards`, `discharge`]
  , cn = {
    slash: 0,
    beam: 1,
    explosion: 2,
    strike: 3,
    cone: 4,
    reset: 5,
    spawn: 6,
    death: 7,
    shockwave: 8,
    chain: 9,
    heal: 10,
    pickup: 11,
    bark: 12,
    bite: 13,
    gpuSteam: 14,
    shards: 15,
    discharge: 16
}
  , ln = {
    slash: .15,
    beam: .2,
    explosion: .3,
    strike: .25,
    cone: .17,
    reset: .9,
    spawn: .25,
    death: .3,
    shockwave: .35,
    chain: .15,
    heal: .4,
    pickup: .3,
    bark: .35,
    bite: .2,
    gpuSteam: .9,
    shards: .4,
    discharge: .3
}
  , un = {
    straight: 0,
    lob: 1,
    boomerang: 2,
    bounce: 3,
    homing: 4,
    spiral: 5
}
  , dn = {
    slash: 0,
    targetShot: 1,
    facingShot: 2,
    lob: 3,
    boomerang: 4,
    orbit: 5,
    aura: 6,
    pool: 7,
    strike: 8,
    bouncer: 9,
    explosive: 10,
    mine: 11,
    chain: 12,
    nova: 13,
    nuke: 14,
    turret: 15,
    homing: 16,
    beam: 17,
    rain: 18,
    cone: 19,
    familiar: 20,
    spiral: 21,
    guard: 22,
    tether: 23,
    ring: 24
}
  , fn = {
    dud: 1,
    freeze: 2,
    burn: 3,
    split: 4,
    gold: 5,
    blast: 6
}
  , pn = {
    aimed: 0,
    fan: 1,
    ring: 2,
    spiral: 3
}
  , mn = [`turret`, `familiar`]
  , hn = {
    turret: 0,
    familiar: 1
}
  , gn = {
    evolve: 0,
    unite: 1
}
  , _n = [`wander`, `hop`, `cheer`, `beam`, `swarm`]
  , vn = {
    wander: 0,
    hop: 1,
    cheer: 2,
    beam: 3,
    swarm: 4
}
  , yn = {
    none: 0,
    dig: 1,
    rise: 2
}
  , bn = {
    off: 0,
    free: 1,
    jailed: 2,
    strayed: 3,
    lassoed: 4,
    pulling: 5
}
  , M = {
    alive: 0,
    revived: 1,
    knocked: 2,
    fading: 3,
    dark: 4,
    beam: 5,
    drop: 6,
    dawn: 7
}
  , xn = [`arrive`, `bonk`, `drop`, `leave`]
  , Sn = {
    arrive: 0,
    bonk: 1,
    drop: 2,
    leave: 3
}
  , Cn = {
    Elite: 1,
    Chest: 2,
    NoSplit: 4,
    Down: 8,
    NoDrops: 16,
    Invincible: 32,
    Hidden: 64,
    CursedExtra: 128
}
  , wn = {
    NoDrops: 1,
    BossShare: 2,
    Kill: 4,
    Reset: 8
}
  , Tn = {
    far: 0,
    near: 1,
    counted: 2
}
  , En = 65535
  , Dn = class extends RangeError {
    name = `PoolFull`
}
  , On = class {
    capacity;
    alive;
    gen;
    dense;
    denseIndex;
    free;
    freeTop;
    dying;
    dyingTop = 0;
    count = 0;
    constructor(e) {
        if (e > En)
            throw new Dn(`SlotPool capacity ${e} is over 65535`);
        this.capacity = e,
        this.alive = new Uint8Array(e),
        this.gen = new Uint16Array(e),
        this.dense = new Int32Array(e),
        this.denseIndex = new Int32Array(e).fill(-1),
        this.free = new Int32Array(e),
        this.dying = new Int32Array(e);
        for (let t = 0; t < e; t++)
            this.free[t] = e - 1 - t;
        this.freeTop = e
    }
    spawn() {
        if (this.freeTop === 0)
            return -1;
        this.freeTop--;
        let e = this.free[this.freeTop] ?? -1;
        return e < 0 ? -1 : (this.gen[e] = (this.gen[e] ?? 0) + 1 & 65535,
        this.alive[e] = 1,
        this.dense[this.count] = e,
        this.denseIndex[e] = this.count,
        this.count++,
        e)
    }
    respawn(e) {
        return this.alive[e] === 1 ? (this.gen[e] = (this.gen[e] ?? 0) + 1 & 65535,
        e) : -1
    }
    has(e) {
        let t = e & En;
        return Number.isInteger(e) && e >= 0 && this.alive[t] === 1 && this.gen[t] === e >>> 16
    }
    id(e) {
        let t = ((this.gen[e] ?? 0) << 16 | e) >>> 0;
        if (this.has(t))
            return t;
        throw new Dn(`Slot ${e} is not live`)
    }
    slotOf(e) {
        return e & En
    }
    isAlive(e) {
        return this.alive[e] === 1
    }
    slotAt(e) {
        return this.dense[e] ?? -1
    }
    kill(e) {
        this.alive[e] === 1 && (this.alive[e] = 0,
        this.dying[this.dyingTop] = e,
        this.dyingTop++)
    }
    release() {
        for (let e = 0; e < this.dyingTop; e++) {
            let t = this.dying[e] ?? -1
              , n = this.denseIndex[t] ?? -1;
            if (n < 0)
                continue;
            let r = this.dense[this.count - 1] ?? t;
            this.dense[n] = r,
            this.denseIndex[r] = n,
            this.denseIndex[t] = -1,
            this.count--,
            this.free[this.freeTop] = t,
            this.freeTop++
        }
        this.dyingTop = 0
    }
    clear() {
        for (let e = 0; e < this.count; e++)
            this.kill(this.slotAt(e));
        this.release()
    }
}
;
function kn(e, t) {
    let n = e.next() < t.visitChance
      , r = e.range(t.windowSec[0], t.windowSec[1]);
    return n ? Math.round(60 * r) : -1
}
function An(e, t) {
    return e.chance(t.giftChance)
}
var jn = class {
    pool = new On(1);
    dueTick;
    gift;
    visited = !1;
    phase = new Uint8Array(1);
    phaseTicks = new Int32Array(1);
    x = new Float64Array(1);
    y = new Float64Array(1);
    z = new Float64Array(1);
    px = new Float64Array(1);
    py = new Float64Array(1);
    pz = new Float64Array(1);
    dirX = new Int8Array([1]);
    hit = new Uint8Array(1);
    dropX = new Float64Array(1);
    dropY = new Float64Array(1);
    dropZ = new Float64Array(1);
    chest = new Float64Array([-1]);
    constructor(e) {
        this.dueTick = e.dueTick,
        this.gift = e.gift
    }
}
;
function Mn(e) {
    for (let t = 0; t < e.pool.count; t++) {
        let n = e.pool.slotAt(t);
        if (e.pool.isAlive(n))
            return n
    }
    return -1
}
function Nn(e, t) {
    let n = e.phase[t] ?? 0;
    if (function(e) {
        return Number.isInteger(e) && e >= 0 && e < xn.length
    }(n))
        return n;
    throw RangeError(`Visit phase code ${n} names no phase`)
}
function Pn(e) {
    let t = new Lt;
    return {
        script: async () => (await A(async () => {
            let {storyLineScript: e} = await __tiboRetry(`./story-line-script-yg13RTay.js`);
            return {
                storyLineScript: e
            }
        }
        , [], import.meta.url)).storyLineScript( () => e.overlay.root),
        openTab: Ht,
        secondsSincePress: () => t.secondsSincePress(),
        activated: Ft
    }
}
var Fn = {
    kind: `advance`
}
  , In = {
    kind: `auto`,
    holdSec: E.storyLine.holdSec
};
function Ln(e) {
    let t = e.visitor
      , n = Mn(t);
    return n >= 0 && t.phase[n] === Sn.bonk ? n : -1
}
function Rn(e) {
    if (e.mode !== `story` || !e.over)
        return !1;
    let t = Ln(e);
    return t >= 0 && e.visitor.hit[t] === 1
}
var zn = class {
    app;
    loads;
    script;
    loading;
    failedFor;
    said;
    done = new Map;
    tab;
    knocked;
    laughFx;
    constructor(e, t) {
        this.app = e,
        this.loads = t,
        e.speaker.onClosed.add(e => {
            this.closed(e)
        }
        )
    }
    get grokTabOwed() {
        let e = this.tab;
        return e?.run === this.app.game.state && !e.opened
    }
    get holds() {
        let e = this.app.game.state;
        return !(this.script === void 0 || !this.app.speaker.ready) && this.done.get(`bonk`) !== e && function(e) {
            if (e.mode !== `story` || e.over)
                return !1;
            let t = Ln(e);
            return t >= 0 && e.visitor.phaseTicks[t] === 0
        }(e)
    }
    get speaking() {
        return this.shows() || this.holds
    }
    get laughing() {
        return !0 === this.said?.laugh && this.shows()
    }
    readyForDeathPanel(e) {
        let t = this.app.game
          , n = t.state
          , r = Rn(n);
        return r && this.knocked?.run !== n && (this.knocked = {
            run: n,
            clock: e
        }),
        r && this.openGrokTab(n, e),
        !(!function(e, t) {
            let n = Ot.get(e);
            n === void 0 && (n = t,
            Ot.set(e, n));
            let r = e.state;
            return (r.player.hp[r.me] ?? 0) > 0 || t - n >= E.death.holdSec
        }(t, e) || r && (this.done.get(`fall`) !== n && this.speak(n, `fall`),
        this.done.get(`fall`) !== n || this.tab?.run !== n))
    }
    frame(e) {
        let t = this.app.game.state;
        this.said !== void 0 && this.said.run !== t && this.hush(),
        this.showLaugh(e),
        t.mode === `story` && (t.visitor.dueTick >= 0 && this.prefetch(),
        this.holds && this.speak(t, `bonk`))
    }
    shows() {
        let e = this.said;
        return e?.run === this.app.game.state && this.app.speaker.speech === e.speech
    }
    showLaugh(e) {
        let t = this.laughFx;
        if (!this.laughing || !e)
            return void t?.hide();
        let n = this.app;
        n.shake.hold(E.storyLine.laughTrauma);
        let r = {
            still: n.motion.matches,
            flashes: n.settings.flashes
        };
        if (t !== void 0)
            return void t.show(r);
        let i = this.script;
        i !== void 0 && (this.laughFx = i.laugh(),
        this.laughFx.show(r))
    }
    hush() {
        this.app.speaker.speech === this.said?.speech && this.app.speaker.close(),
        this.said = void 0,
        this.laughFx?.hide()
    }
    openGrokTab(e, t) {
        if (this.tab?.run === e)
            return;
        let n = this.knocked;
        if (n?.run !== e)
            return;
        let r = this.loads
          , i = t - n.clock >= E.storyLine.grokTabSec
          , a = r.secondsSincePress() >= E.storyLine.grokTabByPressSec;
        if (!i && !a)
            return;
        let o = r.activated() && r.openTab(E.ad.url);
        o && kt({
            kind: `grok_link`,
            from: `story`
        }),
        this.tab = {
            run: e,
            opened: o
        }
    }
    closed(e) {
        let t = this.said;
        t?.speech === e && t.run === this.app.game.state && this.next(t)
    }
    next(e) {
        this.sayLine(e.run, {
            at: e.at,
            index: e.index + 1
        }) || this.done.set(e.at, e.run)
    }
    speak(e, t) {
        let n = this.said;
        n?.run !== e || n.at !== t ? this.script === void 0 ? this.loading === void 0 && this.done.set(t, e) : this.sayLine(e, {
            at: t,
            index: 0
        }) || this.done.set(t, e) : this.app.speaker.speech !== n.speech && this.next(n)
    }
    sayLine(e, t) {
        let n = this.script
          , r = n?.lines[t.at][t.index];
        if (n === void 0 || r === void 0)
            return !1;
        let i = {
            speaker: n.voice,
            text: r.text(),
            mode: t.at === `bonk` ? Fn : In
        }
          , a = r.look === `laugh`;
        return this.said = {
            run: e,
            at: t.at,
            index: t.index,
            speech: i,
            laugh: a
        },
        this.app.speaker.say(i),
        a && this.app.audio.playSfx(`evilLaugh`, 1),
        !0
    }
    prefetch() {
        let e = this.app.game.state;
        this.loading === void 0 && this.failedFor !== e && (this.app.speaker.prefetch(),
        this.loading = this.loads.script().then(e => {
            this.script = e
        }
        , t => {
            this.loading = void 0,
            this.failedFor = e
        }
        ))
    }
}
  , Bn = {
    script: async () => (await A(async () => {
        let {friesLineScript: e} = await __tiboRetry(`./fries-line-script-CBUNn-Sv.js`);
        return {
            friesLineScript: e
        }
    }
    , [], import.meta.url)).friesLineScript()
};
function Vn(e) {
    return e.mode === `story` && e.down.phase === M.dark
}
function Hn(e) {
    return e.story.phase === `bossFight` ? `amusing` : `zombies`
}
var Un = class {
    app;
    loads;
    script;
    loading = !1;
    failedFor;
    said;
    read;
    constructor(e, t=Bn) {
        this.app = e,
        this.loads = t
    }
    get holds() {
        let e = this.app.game.state;
        return !(this.script === void 0 || !this.app.speaker.ready || !Vn(e) || this.readFor(e))
    }
    get speaking() {
        let e = this.said;
        return e?.run === this.app.game.state && this.app.speaker.speech === e.speech || this.holds
    }
    frame() {
        let e = this.app.game.state;
        if (this.said !== void 0 && this.said.run !== e && this.hush(),
        !function(e) {
            let t = e.story.phase;
            return e.mode === `story` && t !== `none` && t !== `chest`
        }(e) || (this.prefetch(e),
        !Vn(e) || this.readFor(e)))
            return;
        let t = this.said;
        t?.run !== e || t.down !== e.down.count ? this.app.tutorial.speaking || this.speak(e, e.down.count) : this.app.speaker.speech !== t.speech && (this.read = t)
    }
    async sample(e) {
        this.script ??= await this.loads.script(),
        this.speak(this.app.game.state, e)
    }
    readFor(e) {
        let t = this.read;
        return t?.run === e && t.down === e.down.count
    }
    speak(e, t) {
        let n = this.script;
        if (n === void 0)
            return;
        let r = {
            speaker: n.voice,
            text: n.line(t, Hn(e)),
            mode: Wn
        };
        this.app.speaker.say(r),
        this.said = {
            run: e,
            down: t,
            speech: r
        }
    }
    hush() {
        this.app.speaker.speech === this.said?.speech && this.app.speaker.close(),
        this.said = void 0,
        this.read = void 0
    }
    prefetch(e) {
        this.loading || this.failedFor === e || (this.loading = !0,
        this.app.speaker.prefetch(),
        this.loads.script().then(e => {
            this.script = e
        }
        , t => {
            this.loading = !1,
            this.failedFor = e
        }
        ))
    }
}
  , Wn = {
    kind: `advance`
}
  , Gn = class extends Error {
    name = `Unreachable`
}
;
function N(e) {
    throw new Gn(`Unhandled union member: ${JSON.stringify(e)}`)
}
var Kn = `hit.crit.kill.gem.coin.hurt.dodge.dash.levelUp.chest.chestDrop.jackpot.reelStop.evolve.reset.bossSpawn.bossDefeated.dogBark.dogJoined.buy.uiSelect.enemyShot.nearMiss.shotHit.textMessage.textTone.speechBlip.bonk.bigBonk.evilLaugh.thud.faceplant.skitter.visitCutIn.overheat.crunch.swat.hazardTick.iaiDraw.sheathe.slice`.split(`.`)
  , qn = [`textMessage`, `textTone`];
function Jn(e, t) {
    if (e.kind !== t.kind)
        return !1;
    switch (e.kind) {
    case `biome`:
        return t.kind === `biome` && e.track === t.track;
    case `boss`:
        return t.kind === `boss` && e.boss === t.boss;
    case `silence`:
    case `intro`:
    case `title`:
    case `win`:
    case `gameOver`:
        return !0;
    default:
        return N(e)
    }
}
var Yn = [`Install Grok Bot at x.ai/bot!`, `Get me at x.ai/bot`, `Grok Bot lives at x.ai/bot`, `Download me: x.ai/bot`, `Want a bot? x.ai/bot`, `Get Grok Bot at x.ai/bot`]
  , Xn = {
    "butter-streak": {
        color: `#f2c94c`,
        icon: `Bt`,
        trail: `butter`
    },
    "chip-shuriken": {
        color: `#f0c060`,
        icon: `Cs`
    },
    "deep-fryer": {
        color: `#ffb347`,
        icon: `Df`,
        spark: `fire`
    },
    "frozen-fries": {
        color: `#a8e4ff`,
        icon: `Ff`,
        spark: `frost`
    },
    "fry-knives": {
        color: `#f3d36b`,
        icon: `Fk`
    },
    "fry-lance": {
        color: `#ffe28a`,
        icon: `Fl`
    },
    "fry-sentry": {
        color: `#d0d0d0`,
        icon: `Fs`
    },
    "frying-pan": {
        color: `#6c7189`,
        icon: `FP`,
        spark: `steel`
    },
    "grab-bag": {
        color: `#c8a46e`,
        icon: `GB`
    },
    "gravy-boat": {
        color: `#8a5a2b`,
        icon: `Gb`,
        spark: `earth`
    },
    "hash-boomerang": {
        color: `#c98b2b`,
        icon: `Hb`
    },
    "hash-brown-shield": {
        color: `#d6a556`,
        icon: `HB`
    },
    "hot-potato": {
        color: `#f2a02c`,
        icon: `HP`,
        spark: `fire`
    },
    "julienne-dash": {
        color: `#f6e7a8`,
        icon: `Ju`
    },
    "mash-wave": {
        color: `#f4ecd6`,
        icon: `Mw`,
        spark: `cream`
    },
    mezzaluna: {
        color: `#c8cedc`,
        icon: `Mz`,
        flingPiece: `hashShred`,
        spark: `steel`
    },
    peeler: {
        color: `#e8e1c8`,
        icon: `Pe`,
        flingPiece: `potatoPeel`,
        spark: `steel`
    },
    "potato-battery": {
        color: `#e3a94a`,
        icon: `Pb`,
        spark: `volt`
    },
    "potato-rain": {
        color: `#b08455`,
        icon: `Pr`,
        spark: `earth`
    },
    "reset-button": {
        color: `#ff3b3b`,
        icon: `RB`
    },
    "root-cellar": {
        color: `#cfeeff`,
        icon: `Rc`,
        spark: `frost`
    },
    "root-spikes": {
        color: `#7a4e2d`,
        icon: `Rs`,
        spark: `earth`
    },
    "rosti-disc": {
        color: `#e0a94a`,
        icon: `Rd`
    },
    "salt-line": {
        color: `#f4f7fb`,
        icon: `SL`,
        spark: `cream`
    },
    "seeker-sprouts": {
        color: `#6fcf5b`,
        icon: `Se`,
        spark: `sprout`
    },
    "small-fry": {
        color: `#ffd36b`,
        icon: `SF`
    },
    "sprout-satellites": {
        color: `#8fd16a`,
        icon: `Ss`,
        spark: `sprout`
    },
    "spud-cannon": {
        color: `#b5793a`,
        icon: `Sc`,
        spark: `fire`
    },
    "spud-dice": {
        color: `#f5f0e1`,
        icon: `SD`,
        spark: `fire`
    },
    "spud-lob": {
        color: `#a97c50`,
        icon: `Sl`,
        spark: `earth`
    },
    "starch-bolt": {
        color: `#fff7a8`,
        icon: `Sb`,
        spark: `volt`
    },
    "starch-chain": {
        color: `#b8f0ff`,
        icon: `Ch`,
        spark: `volt`
    },
    "steam-vent": {
        color: `#dfe7ef`,
        icon: `Sv`,
        spark: `cream`
    },
    "tater-mines": {
        color: `#7b5a3a`,
        icon: `Tm`,
        mine: {
            heat: `base`
        },
        spark: `fire`
    },
    "tater-pup": {
        color: `#e6b25c`,
        icon: `Tp`
    },
    "tot-toss": {
        color: `#d9a441`,
        icon: `Tt`
    },
    "whisk-vortex": {
        color: `#f2e6c9`,
        icon: `WV`,
        whirl: {
            heat: `base`,
            foam: `white`,
            crest: `white`,
            body: `ochre5`,
            mid: `ochre4`,
            trough: `gold`,
            deep: `ochre3`,
            eye: `umber5`,
            flat: {
                light: `white`,
                dark: `lemon`
            },
            swirl: {
                armPeriod: 84
            }
        },
        spark: `cream`
    },
    "big-fry": {
        color: `#ffe08a`,
        icon: `BF`
    },
    "bottomless-sack": {
        color: `#e0bb7c`,
        icon: `BS`
    },
    "cast-iron": {
        color: `#47464f`,
        icon: `CI`,
        spark: `steel`
    },
    "cold-storage": {
        color: `#e8f6ff`,
        icon: `CS`,
        spark: `frost`
    },
    "eternal-sprouts": {
        color: `#b4ff8a`,
        icon: `ES`,
        spark: `sprout`
    },
    "factory-reset": {
        color: `#ff0040`,
        icon: `FR`
    },
    "ghee-glide": {
        color: `#f5d36b`,
        icon: `Gg`,
        trail: `butter`
    },
    "golden-harvest": {
        color: `#ffd700`,
        icon: `GH`
    },
    "gratin-arc": {
        color: `#fff1b0`,
        icon: `GA`,
        spark: `volt`
    },
    "gravy-flood": {
        color: `#a8692e`,
        icon: `GF`,
        spark: `earth`
    },
    "hash-bulwark": {
        color: `#ebc67d`,
        icon: `HW`
    },
    hashnado: {
        color: `#e8a94b`,
        icon: `Hn`
    },
    "inferno-basket": {
        color: `#ff7b2e`,
        icon: `IB`,
        spark: `fire`
    },
    "kettle-cyclone": {
        color: `#ffd27a`,
        icon: `KC`
    },
    "landmine-harvest": {
        color: `#6b8a3a`,
        icon: `LH`,
        mine: {
            heat: `hot`
        },
        spark: `fire`
    },
    "loaded-dice": {
        color: `#ffd04a`,
        icon: `LD`,
        spark: `fire`
    },
    "mandoline-fury": {
        color: `#ff9a9a`,
        icon: `MF`,
        spark: `steel`
    },
    mashquake: {
        color: `#fffaf0`,
        icon: `MQ`,
        spark: `cream`
    },
    "moon-cleaver": {
        color: `#9cc4ec`,
        icon: `MC`,
        spark: `frost`
    },
    overgrowth: {
        color: `#9dff6a`,
        icon: `Og`,
        spark: `sprout`
    },
    "permafrost-fries": {
        color: `#d6f4ff`,
        icon: `PF`,
        spark: `frost`
    },
    "pressure-cooker": {
        color: `#ffffff`,
        icon: `PC`,
        spark: `cream`
    },
    railfry: {
        color: `#fff2b8`,
        icon: `Rf`
    },
    "rosti-storm": {
        color: `#ffc062`,
        icon: `RS`
    },
    "sack-of-russets": {
        color: `#c89566`,
        icon: `SoR`,
        spark: `earth`
    },
    "salt-flats": {
        color: `#ffffff`,
        icon: `SA`,
        spark: `cream`
    },
    "spicy-hot-potato": {
        color: `#ff9d1f`,
        icon: `SH`,
        spark: `fire`
    },
    "spud-grid": {
        color: `#fff08a`,
        icon: `SG`,
        spark: `volt`
    },
    spudzooka: {
        color: `#d9873a`,
        icon: `Sz`,
        spark: `fire`
    },
    "stand-mixer": {
        color: `#fff3d6`,
        icon: `SM`,
        whirl: {
            heat: `hot`,
            foam: `white`,
            crest: `white`,
            body: `bone`,
            mid: `ochre4`,
            trough: `umber5`,
            deep: `umber4`,
            eye: `umber3`,
            flat: {
                light: `white`,
                dark: `lemon`
            }
        },
        spark: `cream`
    },
    "taproot-eruption": {
        color: `#9a6236`,
        icon: `TE`,
        spark: `earth`
    },
    "thousand-fries": {
        color: `#fff09a`,
        icon: `1kF`
    },
    "thunder-tuber": {
        color: `#fffbd1`,
        icon: `TT`,
        spark: `volt`
    },
    "tot-gatling": {
        color: `#ffbf3f`,
        icon: `TG`
    },
    "waffle-cut": {
        color: `#e8b14f`,
        icon: `Wc`
    },
    "fry-brigade": {
        color: `#ffcf7a`,
        icon: `FB`
    },
    "spud-artillery": {
        color: `#d08a4a`,
        icon: `SA`,
        spark: `earth`
    },
    "starch-supercell": {
        color: `#e0fbff`,
        icon: `SSc`,
        spark: `volt`
    }
}
  , Zn = {
    "bacon-bits": {
        color: `#d0503a`,
        icon: `Ba`
    },
    "big-bowl": {
        color: `#d9c7a0`,
        icon: `Bb`
    },
    "butter-pat": {
        color: `#ffe680`,
        icon: `Bu`
    },
    "butter-socks": {
        color: `#f3d27a`,
        icon: `BS`
    },
    chives: {
        color: `#5fbf4a`,
        icon: `Cv`
    },
    fertilizer: {
        color: `#7a9a3a`,
        icon: `Fe`
    },
    "four-eyed-spud": {
        color: `#7fd6ff`,
        icon: `4E`
    },
    "golden-fry": {
        color: `#ffd700`,
        icon: `Gf`
    },
    gpu: {
        color: `#74ad5c`,
        icon: `GPU`
    },
    "gravy-heart": {
        color: `#9b5b2e`,
        icon: `Gh`
    },
    "hot-sauce": {
        color: `#ff3b1f`,
        icon: `Hs`
    },
    "masher-grip": {
        color: `#a0a0a0`,
        icon: `Mh`
    },
    "potato-magnet": {
        color: `#ff5555`,
        icon: `Mg`
    },
    "root-network": {
        color: `#8b5a2b`,
        icon: `Rn`
    },
    "rotten-spud": {
        color: `#6a4a7a`,
        icon: `Ro`
    },
    "salt-shaker": {
        color: `#ffffff`,
        icon: `Sa`
    },
    "slow-cooker": {
        color: `#c26b3a`,
        icon: `Sk`
    },
    "sour-cream": {
        color: `#f8f8f0`,
        icon: `Sc`
    },
    "sprouting-eyes": {
        color: `#c3e88d`,
        icon: `Ey`
    },
    "spud-sneakers": {
        color: `#ff8866`,
        icon: `Sn`
    },
    "starch-plating": {
        color: `#c0c8d0`,
        icon: `Ar`
    },
    "thick-skin": {
        color: `#b08860`,
        icon: `Ts`
    }
}
  , Qn = {
    "baked-buckler": {
        color: `#7c4f2f`
    },
    "boom-spud": {
        color: `#ff7043`,
        spark: `fire`
    },
    "boss-buster": {
        color: `#9aa1b8`
    },
    "chive-charm": {
        color: `#9fcf6e`
    },
    "coal-baked-spud": {
        color: `#e8582a`,
        spark: `fire`
    },
    "compost-tea": {
        color: `#7c4f2f`
    },
    "copper-spoon": {
        color: `#c07f52`
    },
    "coupon-book": {
        color: `#ffd04a`
    },
    "crit-chip": {
        color: `#ffd04a`
    },
    "cursed-crown": {
        color: `#6a3878`
    },
    "extra-eye": {
        color: `#5378b0`
    },
    "freezer-burn": {
        color: `#a8e4ff`,
        spark: `frost`
    },
    "ghost-pepper": {
        color: `#c8cedc`
    },
    "ghost-skin": {
        color: `#c8cedc`
    },
    "golden-gravy": {
        color: `#ffd04a`
    },
    "heavy-russet": {
        color: `#b5845a`,
        spark: `earth`
    },
    "hot-pepper": {
        color: `#d03c3c`
    },
    "lucky-peel": {
        color: `#7c4f2f`
    },
    "penny-spud": {
        color: `#b9843d`
    },
    "philosophers-potato": {
        color: `#ffd04a`
    },
    "pickle-jar": {
        color: `#4b7a35`
    },
    "porcupine-spud": {
        color: `#f3d36b`
    },
    "salt-crystal": {
        color: `#c8cedc`
    },
    "second-spud": {
        color: `#d6a556`
    },
    "sharp-peeler": {
        color: `#1878a8`
    },
    "spicy-croquette": {
        color: `#ff7a2e`,
        spark: `fire`
    },
    "spud-muffin": {
        color: `#d6a556`
    },
    "starch-sock": {
        color: `#e8e1d3`
    },
    "static-tot": {
        color: `#9cc4ec`,
        spark: `volt`
    },
    "thorny-jacket": {
        color: `#4b7a35`,
        spark: `sprout`
    },
    "time-tuber": {
        color: `#b9843d`
    },
    "vampire-tot": {
        color: `#d6a556`
    },
    "wandering-eyes": {
        color: `#9fcf6e`
    },
    "wide-ladle": {
        color: `#9aa1b8`
    },
    "all-seeing-spud": {
        color: `#d2eb94`
    },
    "bonfire-spud": {
        color: `#ffb03a`,
        spark: `fire`
    },
    "fry-volcano": {
        color: `#ffd04a`,
        spark: `fire`
    },
    "glacier-spud": {
        color: `#c4f2ff`,
        spark: `frost`
    },
    "kaboom-spud": {
        color: `#f2c94c`,
        spark: `fire`
    },
    "magma-croquette": {
        color: `#ffc04a`,
        spark: `fire`
    },
    "meteor-russet": {
        color: `#ebc67d`,
        spark: `earth`
    },
    "storm-tot": {
        color: `#8aeaff`,
        spark: `volt`
    }
}
  , $n = {
    aphid: {
        color: `#c5e1a5`
    },
    "beetle-brood": {
        color: `#f9a825`
    },
    "blight-spore": {
        color: `#7cb342`
    },
    "bog-slime": {
        color: `#7cb342`
    },
    "bog-toad": {
        color: `#558b2f`
    },
    "bowling-ball": {
        color: `#283593`
    },
    "bowling-pin": {
        color: `#fafafa`
    },
    "cave-grub": {
        color: `#bcaaa4`
    },
    "compost-maggot": {
        color: `#d7ccc8`
    },
    "crumb-ant": {
        color: `#8d6e63`
    },
    "dumpster-raccoon": {
        color: `#78909c`
    },
    "field-crow": {
        color: `#37474f`
    },
    "field-rat": {
        color: `#757575`
    },
    "frost-flea": {
        color: `#b3e5fc`
    },
    "fry-fly": {
        color: `#ffe082`
    },
    "garden-slug": {
        color: `#a1887f`
    },
    "golden-scarab": {
        color: `#ffd700`,
        treasure: {
            glowLift: 7,
            pin: `scarab`
        }
    },
    "grease-fiend": {
        color: `#ff6f00`
    },
    "gull-flock": {
        color: `#cfd8dc`
    },
    "harvest-mouse": {
        color: `#bdbdbd`
    },
    "hay-bale": {
        color: `#d4b04c`
    },
    "ice-imp": {
        color: `#81d4fa`
    },
    "ketchup-drop": {
        color: `#e53935`
    },
    "lint-bunny": {
        color: `#d7ccc8`
    },
    "little-grey": {
        color: `#b0bec5`
    },
    "lost-saucer": {
        color: `#a5d6a7`,
        treasure: {
            glowLift: 18,
            pin: `saucer`
        }
    },
    "maggot-swarm": {
        color: `#efebe9`
    },
    mole: {
        color: `#5d4037`
    },
    "mud-golem": {
        color: `#4e342e`
    },
    "oil-drip": {
        color: `#ffcc80`
    },
    "parking-gull": {
        color: `#eceff1`
    },
    "potato-beetle": {
        color: `#fbc02d`
    },
    "reset-zombie": {
        color: `#9aa1b8`,
        speech: `resetPlea`
    },
    "sand-crab": {
        color: `#ffb74d`
    },
    "sizzle-imp": {
        color: `#ff7043`
    },
    "snow-mold": {
        color: `#eceff1`
    },
    "sock-pile": {
        color: `#f48fb1`
    },
    spittlebug: {
        color: `#5f9a3c`
    },
    "sprout-mite": {
        color: `#9ccc65`
    },
    "swarm-fly": {
        color: `#fff59d`
    },
    "tomato-leech": {
        color: `#c62828`
    },
    "wireworm-larva": {
        color: `#ff8f00`
    }
}
  , er = {
    amusing: {
        shape: `plush`,
        color: `#f3c6c3`,
        sprite: `amusing`
    },
    "beetle-queen": {
        shape: `round`,
        color: `#fbc02d`,
        sprite: `beetle-queen`
    },
    "compost-titan": {
        shape: `blob`,
        color: `#5d4037`,
        sprite: `compost-titan`
    },
    "deep-freezer": {
        shape: `box`,
        color: `#81d4fa`,
        sprite: `deep-freezer`
    },
    "fryer-king": {
        shape: `box`,
        color: `#ff9800`,
        sprite: `fryer-king`,
        puddle: {
            body: `#0e0805`,
            edge: `#3f2a19`,
            fleck: `#6c7189`,
            bubble: `#55331c`
        }
    },
    "grater-golem": {
        shape: `box`,
        color: `#90a4ae`,
        sprite: `grater-golem`
    },
    "great-wireworm": {
        shape: `segmented`,
        color: `#ff8f00`,
        sprite: `great-wireworm`
    },
    harvester: {
        shape: `wide`,
        color: `#c62828`,
        sprite: `harvester`
    },
    "ketchup-kraken": {
        shape: `tentacled`,
        color: `#d32f2f`,
        sprite: `ketchup-kraken`
    },
    "late-blight": {
        shape: `blob`,
        color: `#689f38`,
        sprite: `late-blight`,
        puddle: {
            body: `#3d1b58`,
            edge: `#050506`,
            fleck: `#6c7189`,
            bubble: `#9258a2`
        }
    },
    "sir-strawman": {
        shape: `tall`,
        color: `#d7b46a`,
        sprite: `sir-strawman`
    },
    "the-mandoline": {
        shape: `wide`,
        color: `#cfd8dc`,
        sprite: `the-mandoline`
    },
    "the-masher": {
        shape: `tall`,
        color: `#b0bec5`,
        sprite: `the-masher`
    }
}
  , tr = {
    beagle: {
        color: `#c58a4a`
    },
    collie: {
        color: `#2b2b2b`
    },
    corgi: {
        color: `#e8964a`
    },
    dachshund: {
        color: `#8b4a2b`
    },
    greyhound: {
        color: `#9e9e9e`
    },
    pomchi: {
        color: `#5b5f6e`,
        legendary: `night`
    },
    pomeranian: {
        color: `#f2b25c`,
        legendary: `sun`
    },
    retriever: {
        color: `#e0b25c`
    },
    "saint-bernard": {
        color: `#a0522d`
    },
    terrier: {
        color: `#f2efe6`
    },
    "zelda-and-link": {
        color: `#8f7bb8`,
        legendary: `eclipse`
    }
}
  , nr = {
    "chip-canyons": {
        ground: `#c99a5b`,
        accent: `#a67a3f`,
        poiRing: {
            ring: `umber1`,
            keyline: `skin2`,
            charge: `umber0`
        },
        music: `biome-chip-canyons`
    },
    "coin-laundromat": {
        ground: `#cfd8dc`,
        accent: `#80cbc4`,
        poiRing: {
            ring: `pine0`,
            keyline: `white`,
            charge: `umber0`
        },
        music: `biome-coin-laundromat`
    },
    "compost-caves": {
        ground: `#4a3b30`,
        accent: `#35291f`,
        poiRing: {
            ring: `umber5`,
            keyline: `umber2`,
            charge: `gold`
        },
        music: `biome-compost-caves`
    },
    "crop-circle": {
        ground: `#d8c27a`,
        accent: `#9e8a4a`,
        poiRing: {
            ring: `olive0`,
            keyline: `bone`,
            charge: `umber0`
        },
        music: `biome-crop-circle`
    },
    "frozen-tundra": {
        ground: `#dfeef5`,
        accent: `#b8d3e0`,
        poiRing: {
            ring: `navy1`,
            keyline: `white`,
            charge: `umber0`
        },
        music: `biome-frozen-tundra`
    },
    "fry-oil-desert": {
        ground: `#d9b46a`,
        accent: `#b89048`,
        poiRing: {
            ring: `umber2`,
            keyline: `skin3`,
            charge: `umber0`
        },
        music: `biome-fry-oil-desert`
    },
    "fry-palace": {
        ground: `#5b5f66`,
        accent: `#f4c430`,
        poiRing: {
            ring: `mist`,
            keyline: `iron`,
            charge: `gold`
        },
        music: `biome-fry-palace`
    },
    "gutterball-lanes": {
        ground: `#d9a66b`,
        accent: `#6d4c2f`,
        poiRing: {
            ring: `umber2`,
            keyline: `bone`,
            charge: `umber0`
        },
        music: `biome-gutterball-lanes`
    },
    "ketchup-bog": {
        ground: `#8e3b2f`,
        accent: `#6d2b22`,
        poiRing: {
            ring: `bone`,
            keyline: `iron`,
            charge: `gold`
        },
        music: `biome-ketchup-bog`
    },
    "mash-swamp": {
        ground: `#cfc6a8`,
        accent: `#a89f80`,
        poiRing: {
            ring: `olive0`,
            keyline: `bone`,
            charge: `umber0`
        },
        music: `biome-mash-swamp`
    },
    "peel-forest": {
        ground: `#3e6b35`,
        accent: `#2c4d26`,
        poiRing: {
            ring: `leaf1`,
            keyline: `olive1`,
            charge: `gold`
        },
        music: `biome-peel-forest`
    },
    "potato-field": {
        ground: `#6b8e3d`,
        accent: `#4f6b2a`,
        poiRing: {
            ring: `white`,
            keyline: `olive2`,
            charge: `lemon`
        },
        music: `biome-potato-field`
    }
}
  , rr = {
    bubbler: {
        icon: `help-shield`
    },
    gifter: {
        icon: `help-gift`
    },
    tidier: {
        icon: `help-magnet`
    },
    zapper: {
        icon: `help-bolt`
    }
}
  , ir = {
    weapon: e => Xn[e],
    passive: e => Zn[e],
    item: e => Qn[e],
    enemy: e => $n[e],
    boss: e => er[e],
    dog: e => tr[e],
    biome: e => nr[e],
    poi: e => Ie[e],
    botHex: e => Pe[e],
    botHelp: e => rr[e],
    botLine: e => Yn[e] ?? Yn[0],
    botLines: Yn
};
function ar(e) {
    let t = e.forks.length;
    for (let n of e.rewards)
        n.type !== `itemEvolution` && t++;
    return t
}
var or = [`jackpot`, `triple`];
function sr(e) {
    return or.find(t => e >= E.jackpot.tiers[t].rewards)
}
function cr(e) {
    if (e?.kind !== `chest` || e.forks.length > 0)
        return;
    let t = sr(ar(e));
    return t === void 0 ? void 0 : {
        chest: e,
        tier: t
    }
}
function lr(e) {
    return e.type === `evolution` || e.type === `union` || e.type === `itemEvolution`
}
function ur(e) {
    return e.map(lr).toSorted( (e, t) => Number(e) - Number(t))
}
function dr(e, t=E.jackpot.tiers.jackpot) {
    let n = []
      , r = []
      , i = t.firstLandSec - t.landGapSec;
    for (let[a,o] of e.entries())
        n.push(t.spinStartSec + a * t.spinStaggerSec),
        i += o ? t.evolveGapSec : t.landGapSec,
        r.push(i);
    return {
        spin: n,
        land: r,
        end: i + t.outroSec
    }
}
var fr = {
    playerHit: `hurt`,
    dodge: `dodge`,
    dashed: `dash`,
    block: `crunch`,
    levelUp: `levelUp`,
    chest: `chest`,
    chestDropped: `chestDrop`,
    evolve: `evolve`,
    union: `evolve`,
    itemEvolve: `evolve`,
    reset: `reset`,
    bossSpawn: `bossSpawn`,
    bossDefeated: `bossDefeated`,
    dogJoined: `dogJoined`,
    dogsFused: `evolve`,
    dogAbility: `dogBark`,
    buy: `buy`,
    spin: `buy`,
    reelStop: `reelStop`,
    vaultOpen: `chest`,
    magnetPull: `coin`,
    tunnelDig: `skitter`,
    tunnelRise: `thud`,
    potetoBonk: `bonk`,
    potetoChestLands: `thud`,
    throttle: `overheat`,
    lassoThrow: `dash`,
    lassoLand: `thud`,
    friesDown: `faceplant`,
    friesRevive: `evolve`,
    storyRefill: `evolve`
}
  , pr = {
    kind: `silence`
}
  , mr = {
    kind: `title`
}
  , hr = {
    kind: `win`
}
  , gr = {
    kind: `gameOver`
}
  , _r = new Map(k.biomes.map(e => [e.id, {
    kind: `biome`,
    track: ir.biome(e.id).music
}]))
  , vr = {
    kills: 0,
    hits: 0,
    crits: 0,
    gems: 0,
    coins: 0,
    shots: 0,
    hostileShots: 0,
    nearMisses: 0,
    hostileHits: 0
}
  , yr = [{
    cue: `shotHit`,
    count: `hostileHits`,
    full: 1
}, {
    cue: `nearMiss`,
    count: `nearMisses`,
    full: 1
}, {
    cue: `enemyShot`,
    count: `hostileShots`,
    full: 8
}]
  , br = Math.max(1, Math.ceil(60 / E.sound.pickupsPerSecond))
  , xr = E.sound.pickupBacklog
  , Sr = Math.max(1, Math.ceil(60 / E.sound.combatPerSecond))
  , Cr = k.bosses.map(e => ({
    kind: `boss`,
    boss: e.id
}));
function wr(e) {
    return {
        music: e.musicVolume,
        sound: e.soundVolume
    }
}
var Tr = class {
    music = pr;
    entry = `cut`;
    quit = !1;
    last = {
        ...vr
    };
    port;
    gemsWaiting = 0;
    coinsWaiting = 0;
    lastPickupTick = -1 / 0;
    charge;
    swats;
    hazard;
    hazardTicks = 0;
    combatFrom = {
        hits: 0,
        crits: 0,
        kills: 0
    };
    lastCombatTick = -1 / 0;
    staged;
    constructor(e, t= () => !1) {
        this.port = e,
        this.staged = t
    }
    hearCharges(e) {
        this.charge = e
    }
    hearSwats(e) {
        this.swats = e
    }
    hearHazard(e) {
        this.hazard = e,
        this.hazardTicks = e.ticks
    }
    quiet() {
        this.entry = `cut`,
        this.music = pr,
        this.port.restartMusic(pr)
    }
    quitRun() {
        this.quit = !0,
        this.music = gr,
        this.entry = `cut`,
        this.port.playMusic(gr, `cut`)
    }
    afterScene(e) {
        this.music.kind === `silence` && (this.entry = e ? `quick` : `follow`)
    }
    frame(e, t) {
        for (let n = 0; n < t.length; n++) {
            let r = t[n];
            if (r === void 0)
                continue;
            r.type === `win` && this.setMusic(hr);
            let i = r.type === `potetoBonk` && r.knockOut ? `bigBonk` : fr[r.type];
            i === void 0 || Er(e, r) || this.staged(r) || this.port.playSfx(i, 1)
        }
        this.charge?.frame(e),
        this.swats?.frame(e),
        this.hazardTick();
        let n = e.counters
          , r = this.last;
        for (let e = 0; e < yr.length; e++) {
            let t = yr[e];
            if (t === void 0)
                continue;
            let i = n[t.count] - r[t.count];
            i > 0 && this.port.playSfx(t.cue, Math.min(1, i / t.full))
        }
        this.combat(e),
        this.trickle(e),
        this.remember(n),
        this.setMusic(this.musicFor(e))
    }
    hazardTick() {
        let e = this.hazard?.ticks ?? 0;
        e > this.hazardTicks && this.port.playSfx(`hazardTick`, 1),
        this.hazardTicks = e
    }
    combat(e) {
        let t = e.tick - this.lastCombatTick;
        if (t >= 0 && t < Sr)
            return;
        let n = e.counters
          , r = this.combatFrom
          , i = function(e, t) {
            return e.crits > t.crits ? `crit` : e.kills > t.kills ? `kill` : e.hits > t.hits ? `hit` : null
        }(n, r);
        i !== null && (this.port.playSfx(i, 1),
        this.lastCombatTick = e.tick,
        r.hits = n.hits,
        r.crits = n.crits,
        r.kills = n.kills)
    }
    trickle(e) {
        let t = e.counters
          , n = this.last;
        this.gemsWaiting = Math.min(xr, this.gemsWaiting + Math.max(0, t.gems - n.gems)),
        this.coinsWaiting = Math.min(xr, this.coinsWaiting + Math.max(0, t.coins - n.coins));
        let r = e.tick - this.lastPickupTick;
        if (!(r >= 0 && r < br)) {
            if (this.coinsWaiting > 0)
                this.coinsWaiting--,
                this.port.playSfx(`coin`, 1);
            else {
                if (!(this.gemsWaiting > 0))
                    return;
                this.gemsWaiting--,
                this.port.playSfx(`gem`, 1)
            }
            this.lastPickupTick = e.tick
        }
    }
    remember(e) {
        let t = this.last;
        t.kills = e.kills,
        t.hits = e.hits,
        t.crits = e.crits,
        t.gems = e.gems,
        t.coins = e.coins,
        t.shots = e.shots,
        t.hostileShots = e.hostileShots,
        t.nearMisses = e.nearMisses,
        t.hostileHits = e.hostileHits
    }
    musicFor(e) {
        if (e.over || this.quit)
            return gr;
        let t = e.bosses;
        for (let e = 0; e < t.pool.count; e++) {
            let n = t.pool.slotAt(e);
            if (t.pool.isAlive(n))
                return Cr[t.def[n] ?? 0] ?? pr
        }
        return e.currentBiome === null ? pr : _r.get(e.currentBiome) ?? pr
    }
    setMusic(e) {
        Jn(e, this.music) || (this.music = e,
        this.port.playMusic(e, e.kind === `gameOver` ? `quick` : this.entry),
        this.entry = `cut`)
    }
    rebase(e) {
        this.quit = !1;
        let t = e.counters;
        this.remember(t),
        this.gemsWaiting = 0,
        this.coinsWaiting = 0,
        this.lastPickupTick = -1 / 0,
        this.charge?.reset(),
        this.hazardTicks = this.hazard?.ticks ?? 0,
        this.combatFrom.hits = t.hits,
        this.combatFrom.crits = t.crits,
        this.combatFrom.kills = t.kills,
        this.lastCombatTick = -1 / 0
    }
    reset(e) {
        this.rebase(e),
        this.entry = `cut`,
        this.music = this.musicFor(e),
        this.port.restartMusic(this.music)
    }
    restartTitle() {
        this.entry = `cut`,
        this.music = mr,
        this.port.restartMusic(mr)
    }
}
;
function Er(e, t) {
    return (t.type === `evolve` || t.type === `union` || t.type === `itemEvolve`) && (n = e.choiceQueue,
    r = t.id,
    n.some(e => e.kind === `chest` && sr(ar(e)) !== void 0 && e.rewards.some(e => lr(e) && e.id === r)));
    var n, r
}
async function Dr(e) {
    await w();
    let {loadEntranceDirector: t} = await A(async () => {
        let {loadEntranceDirector: e} = await __tiboRetry(`./boss-entrance-scene-CH6Uq1GJ.js`);
        return {
            loadEntranceDirector: e
        }
    }
    , [], import.meta.url);
    return t(e)
}
var Or = class {
    app;
    chunk;
    constructor(e, t=Dr) {
        this.app = e,
        this.chunk = e.chunks.slot( () => t(e))
    }
    get director() {
        return this.chunk.value
    }
    get playing() {
        return !0 === this.director?.playing
    }
    get live() {
        return !0 === this.director?.live
    }
    watch(e) {
        this.director?.watch(e)
    }
    landed(e) {
        e.mode === `story` && this.chunk.want()
    }
    frame(e, t) {
        this.app.game.state.tick > 0 && this.chunk.want(),
        this.director?.frame(e, t)
    }
    view() {
        return this.director?.view() ?? null
    }
    skip() {
        return !0 === this.director?.skip()
    }
    stages(e) {
        return !0 === this.director?.stages(e)
    }
}
  , kr = 2 * Math.PI
  , Ar = class {
    offset = {
        x: 0,
        y: 0
    };
    tuning;
    trauma = 0;
    clock = 0;
    kickY = 0;
    constructor(e) {
        this.tuning = e
    }
    get resting() {
        return this.trauma === 0 && this.kickY === 0
    }
    hear(e, t) {
        for (let n of e)
            this.addTrauma(this.traumaOf(n, t))
    }
    addTrauma(e) {
        this.trauma = Math.min(1, this.trauma + e)
    }
    hold(e) {
        this.trauma = Math.max(this.trauma, Math.min(1, e))
    }
    kick(e) {
        this.kickY = e
    }
    advance(e, t) {
        if (this.trauma = Math.max(0, this.trauma - e * this.tuning.decayPerSec),
        this.trauma === 0)
            return this.clock = 0,
            this.offset.x = 0,
            void (this.offset.y = t * this.kickY);
        this.clock += e;
        let n = t * this.tuning.maxOffset * this.trauma * this.trauma
          , r = this.clock * kr;
        this.offset.x = .5 * n * (Math.sin(7.3 * r) + Math.sin(12.1 * r + 1.3)),
        this.offset.y = .5 * n * (Math.sin(8.9 * r + .7) + Math.sin(13.7 * r + 2.1)) + t * this.kickY
    }
    stop() {
        this.trauma = 0,
        this.clock = 0,
        this.kickY = 0,
        this.offset.x = 0,
        this.offset.y = 0
    }
    scaleFor(e, t) {
        if (t)
            return 0;
        switch (e) {
        case `off`:
            return 0;
        case `low`:
            return this.tuning.lowScale;
        case `full`:
            return 1;
        default:
            return N(e)
        }
    }
    traumaOf(e, t) {
        if (e.type === `reset`)
            return this.tuning.reset;
        if (e.type === `bossLanding`)
            return this.tuning.bossLanding;
        if (e.type === `potetoBonk`)
            return this.tuning.potetoBonk;
        if (e.type === `potetoChestLands`)
            return this.tuning.chestLanding;
        if (e.type === `bossDefeated`)
            return this.tuning.bossDefeated;
        if (e.type !== `playerHit`)
            return 0;
        let n = e.amount / Math.max(1, t);
        return n >= this.tuning.bigHitShare ? n * this.tuning.traumaPerHitShare : 0
    }
}
  , jr = class {
    code = E.keys.dash;
    host;
    guardFrom = -1 / 0;
    constructor(e) {
        this.host = e
    }
    watch() {
        (this.host.inPlay() || this.host.screenPending()) && (this.guardFrom = this.host.now())
    }
    get guarding() {
        let e = 1e3 * E.dash.guardSec;
        return !this.host.inPlay() && this.host.now() - this.guardFrom < e
    }
}
  , Mr = /^[a-z]$/i
  , Nr = /^[^\p{L}]$/su
  , Pr = /^Numpad([0-9])$/
  , Fr = /^[0-9]$/;
function Ir(e) {
    if (Mr.test(e.key))
        return `Key${e.key.toUpperCase()}`;
    let t = Pr.exec(e.code);
    return t !== null && Fr.test(e.key) ? `Digit${t[1] ?? ``}` : e.code.startsWith(`Key`) && (n = e.key,
    Nr.test(n)) ? `Unidentified` : e.code;
    var n
}
var P = 64
  , Lr = 1e3 / 60
  , Rr = class {
    ts = new Float64Array(P);
    xs = new Float64Array(P);
    ys = new Float64Array(P);
    oldest = 0;
    count = 0;
    constructor(e) {
        this.add(e)
    }
    add(e) {
        let t = (this.oldest + this.count) % P;
        this.ts[t] = e.timeStamp,
        this.xs[t] = e.clientX,
        this.ys[t] = e.clientY,
        this.count < P ? this.count++ : this.oldest = (this.oldest + 1) % P
    }
    stroke(e) {
        let t = this.slot(this.count - 1)
          , n = this.ts[t] ?? 0
          , r = this.xs[t] ?? 0
          , i = this.ys[t] ?? 0
          , a = -1
          , o = n;
        for (let t = this.count - 2; t >= 0; t--) {
            let s = this.slot(t)
              , c = this.ts[s] ?? n
              , l = n - Math.max(c, o - Lr);
            if (l > e.windowMs)
                break;
            let u = Math.hypot(r - (this.xs[s] ?? r), i - (this.ys[s] ?? i));
            u >= e.minPx && 1e3 * u >= e.pxPerSec * l && (a = s),
            o = c
        }
        return a === -1 ? null : {
            x0: this.xs[a] ?? r,
            y0: this.ys[a] ?? i,
            x: r,
            y: i
        }
    }
    slot(e) {
        return (this.oldest + e) % P
    }
}
  , zr = class {
    trails = new Map;
    held;
    lift;
    inPlay;
    constructor(e, t) {
        this.held = {
            minPx: e.minPx,
            windowMs: e.windowMs,
            pxPerSec: e.heldPxPerSec
        },
        this.lift = {
            minPx: e.minPx,
            windowMs: e.windowMs,
            pxPerSec: e.liftPxPerSec
        },
        this.inPlay = t
    }
    down(e, t) {
        this.inPlay() ? this.trails.set(e, new Rr(t)) : this.trails.delete(e)
    }
    move(e, t) {
        let n = this.trails.get(e);
        return n === void 0 ? null : (n.add(t),
        this.inPlay() ? this.spend(e, n.stroke(this.held)) : null)
    }
    up(e, t) {
        let n = this.trails.get(e);
        return this.trails.delete(e),
        n === void 0 ? null : (n.add(t),
        this.inPlay() ? n.stroke(this.lift) : null)
    }
    cancel(e) {
        this.trails.delete(e)
    }
    clear() {
        this.trails.clear()
    }
    spend(e, t) {
        return t !== null && this.trails.delete(e),
        t
    }
}
  , Br = [`qwerty`, `azerty`, `qwertz`, `dvorak`, `colemak`]
  , Vr = `KeyQ.KeyW.KeyE.KeyR.KeyT.KeyY.KeyU.KeyI.KeyO.KeyP.KeyA.KeyS.KeyD.KeyF.KeyG.KeyH.KeyJ.KeyK.KeyL.Semicolon.KeyZ.KeyX.KeyC.KeyV.KeyB.KeyN.KeyM.Comma.Period.Slash`.split(`.`)
  , Hr = {
    qwerty: `qwertyuiopasdfghjkl;zxcvbnm,./`,
    azerty: `azertyuiopqsdfghjklmwxcvbn,;:!`,
    qwertz: `qwertzuiopasdfghjklöyxcvbnm,.-`,
    dvorak: `',.pyfgcrlaoeuidhtns;qjkxbmwvz`,
    colemak: `qwfpgjluy;arstdhneiozxcvbkm,./`
}
  , Ur = [`KeyW`, `KeyA`, `KeyS`, `KeyD`];
function Wr(e, t) {
    let n = Vr.indexOf(t);
    return n < 0 ? void 0 : Hr[e].charAt(n)
}
var Gr = /^[\p{Script=Latin}\p{N}\p{P}\p{S}]$/u;
function Kr(e) {
    return Gr.test(e) ? e.toLowerCase() : void 0
}
var qr = new Set([`ca`, `ch`, `lu`]);
function Jr(e, t) {
    for (let[n,r] of t) {
        let t = Wr(e, n);
        if (t !== void 0 && t !== r)
            return !1
    }
    return !0
}
function Yr(e, t) {
    let n = function(e, t) {
        return Jr(t, e) ? t : Br.find(t => Jr(t, e))
    }(e, t) ?? `qwerty`
      , [r,i,a,o] = Ur.map(t => e.get(t) ?? Wr(n, t) ?? ``);
    return [r ?? ``, i ?? ``, a ?? ``, o ?? ``]
}
function Xr() {}
var Zr = class {
    target;
    seen = new Map;
    guess;
    labels;
    constructor(e) {
        this.target = e,
        this.guess = function(e) {
            let[t=``,n=``] = (e[0] ?? ``).toLowerCase().split(`-`);
            return t !== `fr` || qr.has(n) ? t === `nl` && n === `be` ? `azerty` : `qwerty` : `azerty`
        }(e.navigator.languages),
        this.labels = Yr(this.seen, this.guess),
        e.addEventListener(`keydown`, this.hear, {
            capture: !0,
            passive: !0
        }),
        async function(e) {
            if (!(`keyboard` in e))
                return;
            let t = e.keyboard;
            if (typeof t != `object` || !t || !(`getLayoutMap` in t))
                return;
            let n = t.getLayoutMap;
            return typeof n == `function` ? await Promise.resolve(Reflect.apply(n, t, [])) : void 0
        }(e.navigator).then(e => this.learnMap(e), Xr)
    }
    get move() {
        return this.labels
    }
    destroy() {
        this.target.removeEventListener(`keydown`, this.hear, {
            capture: !0
        })
    }
    hear = e => {
        if (function(e) {
            return e.ctrlKey || e.metaKey || e.altKey || e.getModifierState(`AltGraph`)
        }(e) || !Vr.includes(e.code))
            return;
        let t = Kr(e.key);
        var n;
        t === void 0 || e.shiftKey && (n = e.key).toLowerCase() === n.toUpperCase() || this.seen.get(e.code) !== t && (this.seen.set(e.code, t),
        this.relabel())
    }
    ;
    learnMap(e) {
        for (let[t,n] of function(e) {
            let t = new Map;
            if (typeof e != `object` || !e || !(`forEach` in e))
                return t;
            let n = e.forEach;
            return typeof n != `function` || Reflect.apply(n, e, [ (e, n) => {
                typeof e == `string` && typeof n == `string` && t.set(n, e)
            }
            ]),
            t
        }(e)) {
            let e = Kr(n);
            e !== void 0 && Vr.includes(t) && !this.seen.has(t) && this.seen.set(t, e)
        }
        this.relabel()
    }
    relabel() {
        let e = Yr(this.seen, this.guess);
        var t = e
          , n = this.labels;
        t.every( (e, t) => e === n[t]) || (this.labels = e)
    }
}
;
function Qr(e) {
    return e === `touch` || e === `pen` ? `touch` : e === `mouse` ? `keys` : void 0
}
var $r = {
    KeyW: [0, -1],
    ArrowUp: [0, -1],
    KeyS: [0, 1],
    ArrowDown: [0, 1],
    KeyA: [-1, 0],
    ArrowLeft: [-1, 0],
    KeyD: [1, 0],
    ArrowRight: [1, 0]
};
function ei(e) {
    return $r[e] !== void 0
}
var ti = new Set([`Enter`, `NumpadEnter`, `Space`]);
function ni(e) {
    return ti.has(e)
}
function ri(e) {
    return `Digit${e}`
}
var ii = new Set([`Space`, `Escape`])
  , ai = class {
    down = new Set;
    pressedAt = new Map;
    pointerId = -1;
    stickBy = `touch`;
    originX = 0;
    originY = 0;
    curX = 0;
    curY = 0;
    lastDevice = function() {
        return window.matchMedia(`(pointer: coarse)`).matches ? `touch` : `keys`
    }();
    dashTaken = !1;
    flicks;
    onKey = new Set;
    onKeyHeld = new Set;
    onKeyUp = new Set;
    onFlick = new Set;
    layout = new Zr(window);
    surface;
    ignores;
    steers;
    dashKey;
    guardsDash;
    constructor(e, t) {
        this.surface = e,
        this.ignores = t.ignores,
        this.steers = t.steers,
        this.dashKey = t.dashKey,
        this.guardsDash = t.guardsDash,
        this.flicks = new zr(t.flick,t.flicks),
        e.dataset.input = this.lastDevice,
        window.addEventListener(`keydown`, this.keydown),
        window.addEventListener(`keyup`, this.keyup),
        window.addEventListener(`blur`, this.blur),
        e.addEventListener(`pointerdown`, this.pointerdown),
        window.addEventListener(`pointermove`, this.pointermove),
        window.addEventListener(`pointerup`, this.pointerup),
        window.addEventListener(`pointercancel`, this.pointerup),
        e.addEventListener(`contextmenu`, oi),
        e.addEventListener(`lostpointercapture`, this.pointerup),
        e.addEventListener(`touchmove`, this.touchmove, {
            passive: !1
        })
    }
    get device() {
        return this.lastDevice
    }
    keydown = e => {
        if (e.target instanceof HTMLSelectElement)
            return;
        let t = function(e) {
            return e.ctrlKey || e.metaKey
        }(e);
        if ($r[e.code] === voi
<truncated 271452 bytes>

NOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need.