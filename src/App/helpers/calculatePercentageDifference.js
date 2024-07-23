/**
 * Calculate the percentage difference between two counts.
 *
 * @param {number} currentCount - The current count value.
 * @param {number} previousCount - The previous count value.
 * @returns {number} - The percentage difference, capped at 100%.
 */
export default function calculatePercentageDifference(currentCount, previousCount) {
    if (previousCount === 0) {
        if (currentCount === 0) {
            return 0;
        }
        return 100;
    }

    const difference = currentCount - previousCount;
    const percentageDifference = (difference / previousCount) * 100;

    // Cap the percentage difference at 100%
    const cappedPercentageDifference = Math.min(percentageDifference, 100);

    return parseFloat(cappedPercentageDifference.toFixed(2));
}
