import { ref, computed } from 'vue';  
  
export default function useDateAndTime() {  
  const now = ref(new Date());  
  
  // 使用 computed 来创建年、月、日的响应式引用  
	const year = computed(() => now.value.getFullYear());  
	const month = computed(() => String(now.value.getMonth() + 1).padStart(2, '0'));  
	const day = computed(() => String(now.value.getDate()).padStart(2, '0'));  
  
  // 使用 computed 来创建小时、分钟、秒的响应式引用  
	const hour = computed(() => String(now.value.getHours()).padStart(2, '0'));  
	const minute = computed(() => String(now.value.getMinutes()).padStart(2, '0'));  
	const second = computed(() => String(now.value.getSeconds()).padStart(2, '0'));
  
  // 更新日期
  function updateDate() {  
    now.value = new Date();
  }  
  
  // 获取当前时间的函数  
	function getCurrentTime() {  
		return {  
			year:year.value,
			month:month.value,
			day:day.value,
			hour: hour.value,  
			minute: minute.value,  
			second: second.value,  
		};  
	}
	
	// 获取格式化的当前时间字符串（HH:MM:SS）  
	function getCurrentTimeData() {  
	    return `${year.value}-${month.value}-${day.value}`;  
	}
	  
	function getFormattedDateData() {  
	    return `${hour.value}:${minute.value}:${second.value}`;  
	}

  return {  
    getCurrentDate: () => now.value,
    year,  
    month,  
    day,  
    updateDate,// 更新日期函数
	getCurrentTime,
	getCurrentTimeData,
	getFormattedDateData,
  };  
}