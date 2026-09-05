const {
  validateExerciseName,
  validateSets,
  validateReps,
  validateWeight,
} = require("./validation");

function createInputWithErrorSpan(inputValue, errorSpanId) {
  document.body.innerHTML = `
    <input id="test-input" value="${inputValue}" />
    <span id="${errorSpanId}"></span>
  `;
  return document.getElementById("test-input");
}

describe("validateExerciseName", () => {
  test("returns false when input is empty", () => {
    const input = createInputWithErrorSpan("", "exercise-name-error");
    expect(validateExerciseName(input)).toBe(false);
  });

  test("returns false when input is too short", () => {
    const input = createInputWithErrorSpan("a", "exercise-name-error");
    expect(validateExerciseName(input)).toBe(false);
  });

  test("returns true when input is valid", () => {
    const input = createInputWithErrorSpan("Push Ups", "exercise-name-error");
    expect(validateExerciseName(input)).toBe(true);
  });
});

describe("validateSets", () => {
  test("returns false when input is empty", () => {
    const input = createInputWithErrorSpan("", "exercise-sets-error");
    expect(validateSets(input)).toBe(false);
  });

  test("returns false when input is less than 1", () => {
    const input = createInputWithErrorSpan("0", "exercise-sets-error");
    expect(validateSets(input)).toBe(false);
  });

  test("returns true when input is a valid number", () => {
    const input = createInputWithErrorSpan("3", "exercise-sets-error");
    expect(validateSets(input)).toBe(true);
  });
});

describe("validateReps", () => {
  test("returns false when input is empty", () => {
    const input = createInputWithErrorSpan("", "exercise-reps-error");
    expect(validateReps(input)).toBe(false);
  });

  test("returns true when input is a valid number", () => {
    const input = createInputWithErrorSpan("10", "exercise-reps-error");
    expect(validateReps(input)).toBe(true);
  });
});

describe("validateWeight", () => {
  test("returns true when input is empty (weight is optional)", () => {
    const input = createInputWithErrorSpan("", "exercise-weight-error");
    expect(validateWeight(input)).toBe(true);
  });

  test("returns false when input is negative", () => {
    const input = createInputWithErrorSpan("-5", "exercise-weight-error");
    expect(validateWeight(input)).toBe(false);
  });

  test("returns true when input is a valid positive number", () => {
    const input = createInputWithErrorSpan("20", "exercise-weight-error");
    expect(validateWeight(input)).toBe(true);
  });
});
