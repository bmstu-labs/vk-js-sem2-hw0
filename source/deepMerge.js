'use strict';

/**
 * Рекурсивно объединяет два объекта.
 * Данные копируются из source в target.
 * @param {Object} target - объект, который дополняем
 * @param {Object} source - объект-источник данных
 * @returns {Object}
 */
const deepMerge = (target, source) => {
    // Поверхностная копия target
    const result = { ...target };

    for (const key in source) {
        if (!Object.prototype.hasOwnProperty.call(source, key)) {
            continue;
        }

        const targetValue = target[key];
        const sourceValue = source[key];

        const isTargetObject =
            targetValue !== null &&
            typeof targetValue === 'object' &&
            !Array.isArray(targetValue);

        const isSourceObject =
            sourceValue !== null &&
            typeof sourceValue === 'object' &&
            !Array.isArray(sourceValue);

        if (isTargetObject && isSourceObject) {
            result[key] = deepMerge(targetValue, sourceValue);
        } else {
            result[key] = sourceValue;
        }
    }

    return result;
};
