import BasicInit from "./cases/BasicInit.vue";
import BackendUrl from "./cases/BackendUrl.vue";
import CustomBackend from "./cases/CustomBackend.vue";
import BackendResolve from "./cases/BackendResolve.vue";
import Events from "./cases/Events.vue";
import Locales from "./cases/Locales.vue";

export const links = [
	["/base/:skin", "Tasklist basic", BasicInit, "BasicInit"],
	["/events/:skin", "Events", Events, "Events"],
	["/locales/:skin", "Locales", Locales, "Locales"],
	["/backend-url/:skin", "Save to backend", BackendUrl, "BackendUrl"],
	["/backend-custom/:skin", "Custom backend", CustomBackend, "CustomBackend"],
	[
		"/data-resolve/:skin",
		"Resolve and fetch",
		BackendResolve,
		"BackendResolve",
	],
];
