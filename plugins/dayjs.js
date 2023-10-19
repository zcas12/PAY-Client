import Vue from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import isBetween from "dayjs/plugin/isBetween"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.locale('ko')
Vue.prototype.$dayjs = dayjs;
