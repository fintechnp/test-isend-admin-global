/**
 * Calculate the percentage difference between two counts.
 *
 * @param {number} currentCount - The current count value.
 * @param {number} previousCount - The previous count value.
 * @returns {number} - The percentage difference.
 */
export default function calculatePercentageDifference(currentCount, previousCount) {
    if (previousCount === 0 && currentCount === 0) {
        return 0;
    } else if (previousCount === 0) {
        return Infinity;
    } else if (currentCount === 0) {
        return -100;
    }

    const difference = currentCount - previousCount;
    const percentageDifference = (difference / previousCount) * 100;

    return parseFloat(percentageDifference.toFixed(2));
}
