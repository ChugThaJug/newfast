import { d as useRoute } from "../server.mjs";
import { u as useFetch } from "./fetch-DpeP4F9c.js";
import { defineComponent, withAsyncContext, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: video, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/videos/${route.params.id}`, "$JF3LIOKm8C")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>Loading...</div>`);
      } else if (unref(error)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(video)) {
        _push(`<div${ssrRenderAttrs(_attrs)}><h1>${ssrInterpolate(unref(video).title)}</h1><p>By ${ssrInterpolate(unref(video).author)}</p><img${ssrRenderAttr("src", unref(video).thumbnail_url)}${ssrRenderAttr("alt", unref(video).title)}><div>${unref(video).summary ?? ""}</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-BcqRtmsL.js.map
