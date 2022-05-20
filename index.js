export class BytesChecker {
  // Private variables
  #bufferSequence = []
  #recording       = false
  #previousIsValid = false

  constructor(begin, end, callback) {
    this.callback = callback
    this.begin    = begin
    this.end      = end

    this.sequence  = []
  }

  listener(numberArray) {
    numberArray.forEach(element => {
      // Save bytes if recording
      if (this.#recording) {
        this.#bufferSequence.push(element)
      }

      // Check end of recording sequence
      if (this.#recording) {
        if (this.#checkRecording(element, this.end)) {
          // Remove number of indexes depending on the length of the end sequence
          this.#bufferSequence.splice(
            this.#bufferSequence.length - this.end.length,
            this.end.length,
          )

          // Copy buffer on public property, making sure a 
          // sequence cannot be accessed while recording
          this.sequence = this.#bufferSequence
          // Execute result callback
          this.callback(this.sequence)
        }
        // Check begin of recording sequence
      } else {
        this.#checkRecording(element, this.begin)
      }
    })
  }

  // ### Private ###

  #checkRecording(byte, byteSuite) {
    // Check begin of provided sequence
    if (byte === byteSuite[0]) {
      this.#previousIsValid = true
      return false
      // If next byte match last byte of the provided sequence, toggle recording
    } else if (byte === byteSuite[1] && this.#previousIsValid) {
      this.#recording = !this.#recording
      this.#previousIsValid = false
      return true
    }

    // Next byte didn't match provided sequence's last byte, reset memory
    this.#previousIsValid = false
  }
}