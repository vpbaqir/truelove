export const ISLAMIC_MONTHS = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

// This is a simplified algorithmic conversion and may have a +/- 1 day variance from local moon sightings.
// It is based on a Tabular Islamic calendar algorithm.
function gregorianToHijri(gYear: number, gMonth: number, gDay: number) {
    let year = gYear;
    let month = gMonth;
    let day = gDay;

    if (month < 3) {
        year -= 1;
        month += 12;
    }

    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    
    // Julian Day
    const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    
    const i = Math.floor((jd - 1948440 + 10632) / 10631);
    const j = jd - 1948440;
    const k = Math.floor((j - 1) / 354);
    const l = j - 354 * k;
    const n = Math.floor((l + 10939) / 10935);
    const m = l - 10935 * (n - 1);
    const d = Math.floor((30 * m + 589) / 1181) + 1;
    
    // The calculation of `hMonth` needs to be carefully implemented.
    // The remainder operator (%) in JS can return negative numbers.
    let hMonthIndex = (Math.floor((m - Math.floor((1181 * d - 590) / 30) - 1) / 29.5) + 12) % 12;
    const hDay = d;
    const hYear = 30 * k + n - 30;

    // A simpler way to get the month from the intermediate 'm' value
    const daysSinceCycleStart = m - Math.floor((1181 * d - 590) / 30);
    const estimatedMonth = Math.floor(daysSinceCycleStart / 29.53);
    hMonthIndex = estimatedMonth;
    
    // Final check for month index since the above calculations are approximations.
    const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]; // Approximate
    let dayCounter = 0;
    let finalMonthIndex = 0;
    for(let i=0; i < 12; i++) {
        dayCounter += monthLengths[i];
        if (daysSinceCycleStart < dayCounter) {
            finalMonthIndex = i;
            break;
        }
    }
    
    // This algorithm isn't perfect, let's use a more standard one.
    const julianDay = jd;
    const l2 = julianDay - 1948440 + 10632;
    const n2 = Math.floor((l2 - 1) / 10631);
    const l3 = l2 - 10631 * n2 + 354;
    const j2 = (Math.floor((10985 - l3) / 5316)) * (Math.floor((50 * l3) / 17719)) + (Math.floor(l3 / 5670)) * (Math.floor((43 * l3) / 15238));
    const l4 = l3 - (Math.floor((30 - j2) / 15)) * (Math.floor((17719 * j2) / 50)) - (Math.floor(j2 / 16)) * (Math.floor((15238 * j2) / 43)) + 29;
    const m2 = Math.floor((24 * l4) / 709);
    const hDayFinal = l4 - Math.floor((709 * m2) / 24);
    const hYearFinal = 30 * n2 + j2 - 30;
    const hMonthFinal = m2 - 1;

    return { day: hDayFinal, month: hMonthFinal, year: hYearFinal };
}

export function getIslamicDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // JS month is 0-indexed
    const day = today.getDate();
    
    const hijri = gregorianToHijri(year, month, day);

    // Ensure month index is within bounds
    const monthIndex = Math.max(0, Math.min(11, hijri.month));
    const monthName = ISLAMIC_MONTHS[monthIndex];
    
    return `${monthName} ${hijri.day}`;
}
