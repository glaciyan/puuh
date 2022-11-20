import { expect, test } from "vitest";
import {
    HOURS_PATTERN,
    MINUTES_PATTERN,
    SECONDS_PATTERN,
    TimeSpan,
} from "../src/timespan";

test("second pattern returns correct match", () => {
    const str = "asdfasdf 30h50m30ssdfasdfa";
    const result = str.match(SECONDS_PATTERN);

    expect(result).toContain("30s");
    expect(result).toContain("30");
});

test("minute pattern returns correct match", () => {
    const str = "asdfasdf 24h50m30ssdfasdfa";
    const result = str.match(MINUTES_PATTERN);

    expect(result).toContain("50m");
    expect(result).toContain("50");
});

test("hour pattern returns correct match", () => {
    const str = "asdfasdf 24h50m30ssdfasdfa";
    const result = str.match(HOURS_PATTERN);

    expect(result).toContain("24h");
    expect(result).toContain("24");
});

test("parsing of full timestamp", () => {
    const str = "asdfasdf 1h50m30ssdfasdfa";
    const hours = 3.6e6; // 1 hour
    const minutes = 3e6; // 50 minutes
    const seconds = 30000; // 30 seconds
    const total = seconds + minutes + hours;

    const result = TimeSpan.valueOf(str);

    expect(result.getMiliseconds()).eq(total);
});

test("parsing of milisecond timestamp", () => {
    const str = "24ms";
    const result = TimeSpan.valueOf(str);
    expect(result.getMiliseconds()).eq(24);
});

test("parsing of second timestamp", () => {
    const str = "24s";
    const result = TimeSpan.valueOf(str);
    expect(result.getMiliseconds()).eq(24000);
});

test("ignores multiple of same type", () => {
    const str = "24s300s";
    const result = TimeSpan.valueOf(str);
    expect(result.getMiliseconds()).eq(24000);
});

test("parsing of minutes timestamp", () => {
    const str = "20m";
    const result = TimeSpan.valueOf(str);
    expect(result.getMiliseconds()).eq(20 * 1000 * 60);
});

test("parsing of minutes timestamp with getMinute", () => {
    const str = "20m";
    const result = TimeSpan.valueOf(str);
    expect(result.getMinutes()).eq(20);
});

test("parsing of minutes and ms timestamp", () => {
    const str = "20m5ms";
    const result = TimeSpan.valueOf(str);
    expect(result.getMiliseconds()).eq(20 * 1000 * 60 + 5);
});

test("toString", () => {
    let ts = new TimeSpan(1000);
    expect(ts.toString()).eq("1s");

    ts = new TimeSpan(1001);
    expect(ts.toString()).eq("1s 1ms");

    ts = new TimeSpan(500);
    expect(ts.toString()).eq("500ms");

    ts = TimeSpan.valueOf("30h60m");
    expect(ts.toString()).eq("31h");

    ts = TimeSpan.valueOf("30h1m");
    expect(ts.toString()).eq("30h 1m");

    ts = TimeSpan.valueOf("1h1m1s1ms");
    expect(ts.toString()).eq("1h 1m 1s 1ms")

    ts = new TimeSpan(0);
    expect(ts.toString()).eq("");
});
