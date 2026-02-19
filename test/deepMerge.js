'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Не уходит в рекурсию при target[key] === null", function(assert) {
        const source = { a: { x: 1 } };
        const target = { a: null };

        const expected = { a: null };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "null должен перезаписывать объект");
    });

    QUnit.test("Корректно работает если source[key] === null", function(assert) {
        const source = { a: null };
        const target = { a: { x: 1 } };

        const expected = { a: { x: 1 } };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Объект должен перезаписать null");
    });

    QUnit.test("Массивы не мержатся рекурсивно, а перезаписываются", function(assert) {
        const source = { arr: [1, 2, 3] };
        const target = { arr: [4, 5] };

        const expected = { arr: [4, 5] };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Массив должен перезаписываться");
    });

    QUnit.test("Не мутирует исходные объекты", function(assert) {
        const source = { a: { x: 1 } };
        const target = { a: { y: 2 } };

        const result = deepMerge(source, target);

        assert.deepEqual(source, { a: { x: 1 } }, "source не должен изменяться");
        assert.deepEqual(target, { a: { y: 2 } }, "target не должен изменяться");
        assert.deepEqual(result, { a: { x: 1, y: 2 } }, "Результат корректен");
    });

    QUnit.test("Игнорирует свойства прототипа", function(assert) {
        const proto = { inherited: 1 };
        const target = Object.create(proto);
        target.own = 2;

        const source = {};

        const expected = { own: 2 };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Свойства прототипа не должны мержиться");
    });
});
