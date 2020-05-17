declare global {
  interface Window {
    nekoman: any;
  }
}

export default class NekoMan {

    $target: any
    $accessor: any
    locked: boolean = false

    constructor(target: any) {
        this.$target = target
        this.$accessor = target.$accessor
        window.nekoman = this
        console.log("Nekoman available at window.nekoman")
    }

    play() {
        this.$accessor.video.play()
    }

    pause() {
        this.$accessor.video.pause()
    }


    /** Controls */

    get playable() {
        return this.$accessor.video.playable
    }

    getControls() {
        !this.locked && this.$accessor.remote.toggle()
        this.locked = true
    }

    releaseControls() {
        this.locked && this.$accessor.remote.toggle()
        this.locked = false
    }
}