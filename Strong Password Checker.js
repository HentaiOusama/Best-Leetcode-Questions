// Question Link: https://leetcode.com/problems/strong-password-checker/
// Reference Link: https://leetcode.com/problems/strong-password-checker/discuss/1733371/O(n)-solution-with-comment-(Referenced-meng789987's-answer)

let password = "aaaabbbbccccddeeddeeddeedd";

let stepToAllTypes = (str) => {
    let digit = 1, lower = 1, upper = 1;
    for (let char of str) {
        if ("0" <= char && char <= "9") {
            digit = 0;
        } else if ("a" <= char && char <= "z") {
            lower = 0;
        } else if ("A" <= char && char <= "Z") {
            upper = 0;
        }
    }

    return digit + lower + upper;
};

/**
 * @param {string} password
 * @return {number}
 */
let strongPasswordChecker = function(password) {
    let isTest = true;
    
    let passLen = password.length, baseOperationRequired = stepToAllTypes(password);
    if (passLen < 6) {
        return Math.max(baseOperationRequired, 6 - passLen);
    } else {
        let replaceCount = password.match(/([A-Za-z\d.!])(\1){2}/g);
        replaceCount = (replaceCount) ? replaceCount.length : 0;

        if (passLen <= 20) {
            return Math.max(replaceCount, baseOperationRequired);
        } else {
            let deletionCount = 0, recoveredReplaceCount = 0;
            let continuousGroups = password.match(/([A-Za-z\d.!])(\1){2,}/g);
            let continuousGroupCount = (continuousGroups) ? continuousGroups.length : 0;
            let requiredDeleteCount = passLen - 20;

            if (isTest) {
                console.log(continuousGroups, requiredDeleteCount, deletionCount, recoveredReplaceCount, replaceCount);
            }

            // len = 3n
            for (let i = 0; i < continuousGroupCount && requiredDeleteCount > 0; i++) {
                if (continuousGroups[i].length % 3 === 0) {
                    if (recoveredReplaceCount < replaceCount) {
                        recoveredReplaceCount += 1;
                    } else {
                        deletionCount += 1;
                    }
                    requiredDeleteCount -= 1;
                    continuousGroups[i] = continuousGroups[i].charAt(0).repeat(continuousGroups[i].length - 1);
                }
            }

            if (isTest) {
                console.log(continuousGroups, requiredDeleteCount, deletionCount, recoveredReplaceCount, replaceCount);
            }

            // len = 3n + 1
            for (let i = 0; i < continuousGroupCount && requiredDeleteCount > 1; i++) {
                if (continuousGroups[i].length % 3 === 1) {
                    if (recoveredReplaceCount < replaceCount) {
                        recoveredReplaceCount += 1;
                        deletionCount += 1;
                    } else {
                        deletionCount += 2;
                    }
                    continuousGroups[i] = continuousGroups[i].charAt(0).repeat(continuousGroups[i].length - 2);
                    requiredDeleteCount -= 2;
                }
            }

            if (isTest) {
                console.log(continuousGroups, requiredDeleteCount, deletionCount, recoveredReplaceCount, replaceCount);
            }

            // Otherwise
            for (let i = 0; i < continuousGroupCount && requiredDeleteCount > 2; i++) {
                let group = continuousGroups[i], groupLen = group.length;
                while (groupLen > 3 && requiredDeleteCount > 2) {
                    if (recoveredReplaceCount < replaceCount) {
                        recoveredReplaceCount++;
                        deletionCount += 2;
                    } else {
                        deletionCount += 3;
                    }
                    requiredDeleteCount -= 3;
                    groupLen -= 3;
                }
                continuousGroups[i] = group.charAt(0).repeat(groupLen);
            }

            if (isTest) {
                console.log(continuousGroups, requiredDeleteCount, deletionCount, recoveredReplaceCount, replaceCount);
            }

            let currentOperationCount = deletionCount + replaceCount + requiredDeleteCount;
            let remainderReplacements = replaceCount - recoveredReplaceCount;
            if (remainderReplacements < baseOperationRequired) {
                currentOperationCount += baseOperationRequired - remainderReplacements;
            }
            return currentOperationCount;
        }
    }
};

console.log(strongPasswordChecker(password));
