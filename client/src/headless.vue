<template>
  <div id="neko" :class="[side ? 'expanded' : '']">
    <template v-if="!$client.supported">
      <neko-unsupported />
    </template>
    <template v-else>
      <main class="neko-main">
        <div class="video-container">
          <neko-video ref="video" />
        </div>
      </main>
      <neko-side v-if="side" />
      <neko-connect v-if="!connected" />
      <neko-about v-if="about" />
      <notifications group="neko" position="top left" style="top: 50px;" />
    </template>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Ref } from 'vue-property-decorator'

  import Connect from '~/components/connect.vue'
  import Video from '~/components/video.vue'
  import Menu from '~/components/menu.vue'
  import Side from '~/components/side.vue'
  import Controls from '~/components/controls.vue'
  import Members from '~/components/members.vue'
  import About from '~/components/about.vue'
  import Unsupported from '~/components/unsupported.vue'

  @Component({
    name: 'neko',
    components: {
      'neko-connect': Connect,
      'neko-video': Video,
      'neko-unsupported': Unsupported,
    },
  })
  export default class extends Vue {
    @Ref('video') video!: Video

    get about() {
      return this.$accessor.client.about
    }

    get side() {
      return this.$accessor.client.side
    }

    get connected() {
      return this.$accessor.connected
    }
  }
</script>

<style lang="scss">
  #neko {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100vw;
    max-height: 100vh;
    flex-direction: row;
    display: flex;

    .neko-main {
      min-width: 360px;
      max-width: 100%;
      flex-grow: 1;
      flex-direction: column;
      display: flex;
      overflow: auto;

      .header-container {
        background: $background-tertiary;
        height: $menu-height;
        flex-shrink: 0;
        display: flex;
      }

      .video-container {
        background: rgba($color: #000, $alpha: 0.4);
        max-width: 100%;
        flex-grow: 1;
        display: flex;
      }

      .room-container {
        background: $background-tertiary;
        height: $controls-height;
        max-width: 100%;
        flex-shrink: 0;
        flex-direction: column;
        display: flex;

        .room-menu {
          max-width: 100%;
          flex: 1;
          display: flex;

          .settings {
            margin-left: 10px;
            flex: 1;
            justify-content: flex-start;
            align-items: center;
            display: flex;
          }

          .controls {
            flex: 1;
            justify-content: center;
            align-items: center;
            display: flex;
          }

          .emotes {
            margin-right: 10px;
            flex: 1;
            justify-content: flex-end;
            align-items: center;
            display: flex;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    #neko {
      &.expanded {
        .neko-main {
          transform: translateX(-$side-width);
        }
        .neko-menu {
          transform: translateX(-$side-width);
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    #neko {
      .neko-main {
        .room-container {
          display: none;
        }
      }
    }
  }
</style>
