<script setup>
import { ref, computed, watch } from 'vue';
import Layout from './Layout.vue';
import { Locale } from '@svar-ui/vue-core';
import { en } from '@svar-ui/tasklist-locales';

defineOptions({ name: 'TaskList', inheritAttrs: false });

const props = defineProps({
	ondata: { type: Function },
	onchange: { type: Function },
	value: {},
	readonly: { type: Boolean },
});

const awaitedData = ref([]);
const isLoading = ref(true);

const finalData = computed(() => {
	if (props.ondata && props.value !== undefined) {
		return props.ondata(props.value);
	}
	return props.value;
});

watch(
	finalData,
	async newData => {
		if (newData instanceof Promise) {
			isLoading.value = true;
			awaitedData.value = await newData;
			isLoading.value = false;
		} else {
			awaitedData.value = newData;
			isLoading.value = false;
		}
	},
	{ immediate: true }
);

const handleOnchange = e => {
	e.originalValue = props.value;
	return props.onchange && props.onchange(e);
};
</script>

<template>
	<Locale :words="en" :optional="true">
		<Layout
			v-if="isLoading"
			:data="[]"
			:readonly="true"
			:onchange="handleOnchange"
		/>
		<Layout
			v-else
			:data="awaitedData"
			:readonly="props.readonly"
			:onchange="handleOnchange"
		/>
	</Locale>
</template>
