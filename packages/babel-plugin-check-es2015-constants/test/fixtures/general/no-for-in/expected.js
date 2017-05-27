var MULTIPLIER = 5;

throw new ReferenceError("\"MULTIPLIER\" is read-only");
for (MULTIPLIER in arr) {}