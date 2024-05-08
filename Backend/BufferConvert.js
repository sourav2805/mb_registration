function convertBooleanToBuffer(boolValue) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(boolValue ? 1 : 0, 0);
  return buffer;
}

module.exports = convertBooleanToBuffer;
