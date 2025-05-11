import { defineComponent, ref, unref, useSSRContext, withAsyncContext, withCtx, createTextVNode, toDisplayString } from "vue";
import { a as useRouter, _ as _export_sfc } from "../server.mjs";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as __nuxt_component_0 } from "./nuxt-link-l5zPv3vf.js";
import { u as useFetch } from "./fetch-DpeP4F9c.js";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "devalue";
import "ohash";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "VideoForm",
  __ssrInlineRender: true,
  setup(__props) {
    const url = ref("");
    const pending = ref(false);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><input${ssrRenderAttr("value", unref(url))} type="url" placeholder="Enter YouTube URL" required><button type="submit"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""}>Process Video</button></form>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VideoForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RecentVideos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: videos, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/videos", "$A0APtWgZGC")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h2>Recent Videos</h2>`);
      if (unref(pending)) {
        _push(`<div>Loading...</div>`);
      } else if (unref(error)) {
        _push(`<div>${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(videos)) {
        _push(`<div><!--[-->`);
        ssrRenderList(unref(videos), (video) => {
          _push(`<div><h3>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/video/${video.video_id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(video.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(video.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h3><p>By ${ssrInterpolate(video.author)}</p><img${ssrRenderAttr("src", video.thumbnail_url)}${ssrRenderAttr("alt", video.title)}></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecentVideos.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_VideoForm = _sfc_main$2;
  const _component_RecentVideos = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Stepify</h1>`);
  _push(ssrRenderComponent(_component_VideoForm, null, null, _parent));
  _push(ssrRenderComponent(_component_RecentVideos, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-BiOQAE51.js.map
