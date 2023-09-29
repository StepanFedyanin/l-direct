<template>
    <div class="campaign__form">
        <b-form
            class="form"
            @submit="onSubmit"
        >
            <template
                v-if="isCheckAdsType('audio')"
            >
                <label class="form-label text-black"><strong>Аудиоролик</strong></label>
                <b-card
                    v-if="adsFile.uploaded || adsFile.error"
                    class="mb-3"
                >
                    <b-card-text
                        v-if="adsFile.error"
                        class="d-flex"
                    >
                        <span class="h4 m-0 text-danger">{{ adsFile.error }}</span>
                    </b-card-text>
                    <b-card-text
                        v-else-if="adsFile.uploaded"
                        class="d-flex align-items-center"
                    >
                        <b-button
                            v-if="!adsFile.play"
                            variant="outline-warning"
                            class="d-block me-3"
                            @click="playAdsFile"
                        >
                            Play
                        </b-button>
                        <b-button
                            v-if="adsFile.play"
                            variant="outline-warning"
                            class="d-block me-3"
                            @click="stopAdsFile"
                        >
                            Stop
                        </b-button>

                        <a href="#" class="d-block h4 m-0">{{ adsFile.name }}</a><br>

                        <b-button
                            variant="warning"
                            class="d-block ms-auto"
                            @click="deleteAdsFile"
                        >
                            Удалить
                        </b-button>
                    </b-card-text>
                    <b-card-text
                        v-if="adsFile.file && adsFile.file.duration"
                    >
                        <b-progress :max="adsFile.file.duration">
                            <b-progress-bar :value="adsFile.time" :label-html="`<small>${adsFile.time}</small>`"
                                            variant="warning"></b-progress-bar>
                        </b-progress>
                    </b-card-text>
                </b-card>
                <file-upload
                    v-show="adsFile.file == null"
                    ref="upload"
                    v-model="files"
                    name="file"
                    accept="audio/*"
                    :post-action="`${urlPath}/direct/upload/`"
                    :headers="{'Authorization': `Bearer ${bearerToken}`}"
                    @input-file="selectAdsFile"
                    class="btn btn-lg btn-outline-warning mb-4 w-100"
                >
                    Загрузить ролик 20 сек
                </file-upload>
            </template>
            <div class="row">
                <label class="form-label text-black"><strong>Регион трансляции</strong></label>
                <b-form-group
                    id="select-group-region"
                    class="col-12 mt-auto"
                >
                    <b-form-input
                        v-b-toggle="`collapse-region`"
                        class="campaign__form-region form-select form-select-lg form-select-collapse"
                        autocomplete="off"
                        :state="selectedRegionsError"
                        :value="selectedRegions"
                        :placeholder="selectedRegions"
                    ></b-form-input>
                    <b-collapse
                        id="collapse-region"
                        class="form-collapse"
                    >
                        <b-list-group
                            class="list-group-no-border"
                        >
                            <b-list-group-item
                                v-for="(region) in regions"
                                :key="region.value"
                                class="pe-0"
                            >
                                <b-form-checkbox
                                    name="regions"
                                    v-model="campaign.regions"
                                    :value="region.id"
                                >
                                    {{ region.region }}
                                </b-form-checkbox>
                            </b-list-group-item>
                        </b-list-group>
                    </b-collapse>
                </b-form-group>

                <div class="col-12 mb-3">
                    <div class="form-control h3">
                        Стоимость выхода ролика: {{ airingPrice }} ₽
                    </div>
                </div>
            </div>

            <div class="row">
                <label class="form-label text-black"><strong>Расписание показов</strong></label>
                <b-form-group
                    v-if="showTimeZone"
                    id="select-group-country"
                    class="col-12 col-sm-6 mt-auto"
                    label="Часовой пояс"
                >
                    <b-form-select
                        id="select-country"
                        v-model="campaign.country"
                        :options="timezoneCountry"
                        required
                        size="lg"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    v-if="showTimeZone"
                    id="select-group-city"
                    class="col-12 col-sm-6 mt-auto"
                >
                    <b-form-select
                        id="select-city"
                        v-model="campaign.timezone"
                        :options="timezoneHour"
                        required
                        size="lg"
                    ></b-form-select>
                </b-form-group>
            </div>


            <div
                v-for="(period, index) in campaign.campaign_schedule_data"
                :key="`campaign-period-${index}`"
                class="row"
            >
                <b-form-group
                    id="date-group-start"
                    :label="!index ? 'Начало кампании' : ''"
                    class="col col-sm-5 mt-auto mb-2"
                >
                    <DatePicker
                        v-model="period.campaign_start"
                        :model-config="calendarConfig"
                        :masks="masks"
                        :min-date="this.$helpers.formatDate(new Date(), 'YYYY-MM-DD')"
                        :max-date="period.campaign_end"
                        is-required
                        mode="date"
                        color="orange"
                        @dayclick="changeCampaignStartDate"
                    >
                        <template v-slot="{ inputValue, inputEvents }">
                            <b-form-input
                                name="campaign_start"
                                placeholder="дд.мм.гггг"
                                readonly
                                required
                                size="lg"
                                :value="inputValue"
                                v-on="inputEvents"
                                :state="!index ? campaignStartDateError : null"
                            ></b-form-input>
                        </template>
                    </DatePicker>
                </b-form-group>
                <b-form-group
                    id="date-group-end"
                    :label="!index ? 'Конец кампании' : ''"
                    class="col col-sm-5 mt-auto mb-2"
                >
                    <DatePicker
                        v-model="period.campaign_end"
                        :model-config="calendarConfig"
                        :masks="masks"
                        :min-date="period.campaign_start || this.$helpers.formatDate(new Date(), 'YYYY-MM-DD')"
                        is-required
                        mode="date"
                        color="orange"
                        @dayclick="changeCampaignEndDate"
                    >
                        <template v-slot="{ inputValue, inputEvents }">
                            <b-form-input
                                name="campaign_end"
                                placeholder="дд.мм.гггг"
                                readonly
                                required
                                size="lg"
                                :value="inputValue"
                                v-on="inputEvents"
                                :state="!index ? campaignEndDateError : null"
                            ></b-form-input>
                        </template>
                    </DatePicker>
                </b-form-group>
                <b-button
                    v-if="index"
                    class="m--delete"
                    @click.prevent="deleteCompanyPeriod(index)"
                >
                </b-button>
            </div>
            <div
                v-if="campaign.campaign_schedule"
                class="row"
            >
                <div class="col-12 col-md-6 col-lg-5">
                    <b-button
                        variant="outline-warning"
                        class="d-block w-100 mb-3"
                        size="lg"
                        @click.prevent="addCompanyPeriod()"
                    >
                        Добавить период
                    </b-button>
                </div>
            </div>


            <div class="row mb-3">
                <div class="col-12">
                    <b-form-checkbox
                        v-model="campaign.campaign_schedule"
                        name="campaign_schedule"
                        switch
                    >
                        Настроить периоды кампании
                    </b-form-checkbox>
                </div>
            </div>

            <template v-if="!isCheckAdsType('personal')">
                <timeTable
                    :schedule-data="campaign.time_schedule_data"
                    :show="campaign.time_schedule"
                    @changeScheduleData="changeScheduleData"
                    v-if="campaign.time_schedule"
                    :activeDays="activeDay"
                />
                <template v-else>
                    <label class="form-label text-black"><strong>Настройка показов</strong></label>
                    <div class="row">
                        <div
                            v-for="activeDay in timeSelection"
                            :key="activeDay.type+Date.now()"
                            class="row"
                        >
                            <b-form-group
                                id="select-group-period"
                                class="col-12 col-sm-6 mt-auto"
                            >
                                <div class="form-control">
                                    {{ activeDay.type }}
                                </div>
                            </b-form-group>

                            <b-form-group
                                id="select-group-period-start"
                                class="col-6 col-sm-3 mt-auto"
                            >
                                <b-form-select
                                    id="select-period-start"
                                    v-model="activeDay.period_start"
                                    :options="gettingActiveTime(activeDay.type,activeDay.period_start,activeDay.period_end,'start')"
                                    required
                                    :disabled="isDisabledTimeSelection(activeDay.type)"
                                    size="lg"
                                    @change="changeActiveTime"
                                ></b-form-select>
                            </b-form-group>

                            <b-form-group
                                id="select-group-period-end"
                                class="col-6 col-sm-3 mt-auto"
                            >
                                <b-form-select
                                    id="select-period-end"
                                    v-model="activeDay.period_end"
                                    :options="gettingActiveTime(activeDay.type,activeDay.period_start,activeDay.period_end,'end')"
                                    required
                                    :disabled="isDisabledTimeSelection(activeDay.type)"
                                    size="lg"
                                    @change="changeActiveTime"
                                ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>
                </template>
                <div class="row mb-3">
                    <div class="col-12">
                        <b-form-checkbox
                            v-model="campaign.time_schedule"
                            name="schedule"
                            switch
                        >
                            Включить почасовую настройку
                        </b-form-checkbox>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="row mb-3">
                    <label class="form-label text-black"><strong>Время выхода объявления</strong></label>
                    <div class="row">
                        <div
                            class="col-2"
                            v-for="(day,index) in showTime"
                            :key="day.id+index"
                        >
                            <b-form-checkbox
                                class="col-6"
                                :value="day.id"
                                v-model="campaign.time_schedule_data"
                            >
                                {{ day.name }}
                            </b-form-checkbox>
                        </div>
                    </div>
                </div>
                <div class="card p-3 mb-3">
                    <label class="form-label text-black mb-3"><strong>Стоимость выхода объявления: {{ totalPrice() }}
                        ₽</strong></label>
                    <label class="form-label text-black mb-4">Ваше объявление прозвучит в эфире в зависимости от
                        выбранных
                        блоков:</label>
                    <span class="d-flex flex-column mb-4">
              <label class=" text-black">Утро — с 8:00 до 12:00;</label>
              <label class=" text-black">День — с 12:00 до 15:00;</label>
              <label class=" text-black">Вечер — с 17:00 до 22:00.</label>
            </span>
                    <label class="text-black">Время челябинское (+2 часа от московского).</label>
                </div>
            </template>
            <b-button
                type="submit"
                variant="warning"
                class="d-block col-12"
                size="lg"
            >
                Продолжить
            </b-button>
        </b-form>
    </div>
</template>

<script>
import {DatePicker} from 'v-calendar';
import 'v-calendar/dist/style.css';
import {app} from "@/services";
import {app as appSettings} from "@/settings";
import timeTable from '@/components/timeTable';

export default {
    name: 'campaignProps',
    components: {
        DatePicker,
        timeTable
    },
    props: {},
    data() {
        return {
            showTimeZone: false,
            masks: {
                input: 'DD.MM.YYYY',
            },
            calendarConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD'
            },
            timezoneCountry: [
                'Россия'
            ],
            timezoneHour: [{
                text: 'Екатеринбург',
                value: 5,
                selected: true
            }],
            timePeriod: [
                '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
                '24:00'
            ],
            timeSelection: [],
            regions: [],
            showTime: [
                {
                    id: 'morning',
                    name: 'Утро',
                    value: '8:00',
                },
                {
                    id: 'daytime',
                    name: 'День',
                    value: '12:00',
                },
                {
                    id: 'evening',
                    name: 'Вечер',
                    value: '17:00',
                }
            ],
            selectedRegionsError: null,
            campaignStartDateError: null,
            campaignEndDateError: null,
            campaign: null,
            adsFile: {
                error: '',
                uploaded: false,
                play: false,
                time: null,
                file: null,
                name: null
            },
            urlPath: appSettings.url,
            bearerToken: undefined,
            files: [],
            showLoaderSending: false,
            activeDay: [],
            activeTime: {}
        };
    },
    computed: {
        selectedRegions() {
            if (this.campaign.regions.length === 0) {
                return 'Выберите регионы трансляции';
            } else {
                return 'Выбрано ' + this.$helpers.stringForNumber(this.campaign.regions.length, ['город', 'города', 'городов']);
            }
        },
        airingPrice() {
            let price = 0;
            let idx = this.campaign.regions.map(id => {
                return this.regions.map(item => {
                    return item.id;
                }).indexOf(id);
            });
            idx.forEach(id => {
                if (this.regions[id]) {
                    price += this.regions[id].airing_price;
                }
            });
            return price;
        },
    },
    created() {
        this.campaign = this.$store.state.campaign;
        this.bearerToken = this.$store.state.access;
        this.getRegions();
        if (this.campaign.ads_file) {
            app.getAdsFile(this.campaign.ads_file).then(res => {
                Promise.resolve(this.$helpers.getFileInfo(res.file, 'audio')).then((file) => {
                    if (Math.round(file.duration) > 20) {
                        this.adsFile.error = 'Длина ролика превышает 20 сек.';
                        this.adsFile.file = null;
                    } else {
                        this.adsFile.file = file.song;
                        this.adsFile.name = res.name;
                        this.adsFile.uploaded = true;
                        this.adsFile.file.addEventListener('timeupdate', () => {
                            this.adsFile.time = this.adsFile.file.currentTime.toFixed(2);
                            this.adsFile.play = !this.adsFile.file.paused;
                        });
                    }
                });
            }).catch(err => {
                console.error(err);
                this.$store.dispatch('showError', err);
            });
        }
        this.activeTime = {
            weekend: [...this.timePeriod.slice(9, 22 + 1)],
            weekday: [...this.timePeriod.slice(7, 14 + 1), ...this.timePeriod.slice(17, 22 + 1)]
        }
        if (this.campaign.time_period.length === 0) {
            this.timeSelection = [
                {
                    type: 'Будни',
                    period_start: this.activeTime.weekday[0],
                    period_end: this.activeTime.weekday[this.activeTime.weekday.length - 1],
                },
                {
                    type: 'Выходные',
                    period_start: this.activeTime.weekend[0],
                    period_end: this.activeTime.weekend[this.activeTime.weekend.length - 1],
                }
            ];
        } else this.timeSelection = this.campaign.time_period;
        this.gettingActiveDays();
    },
    methods: {
        totalPrice() {
            let total = 0;
            let countView = 0;
            // const quantityDays = this.countingDays(this.campaign.campaign_schedule_data, this.campaign.time_period_type);
            if (this.campaign.ads_type_str === 'audio') {
                const countingTime = this.countingTime(this.campaign.time_schedule, this.timeSelection);
                console.log('countingTime', countingTime);
                // countView = countingTime * quantityDays;
                // total = this.airingPrice * quantityDays * countingTime;
            }
            // else {
            //     // const activeTime = this.campaign.time_schedule_data.length;
            //     // countView = activeTime * quantityDays
            //     // total = this.airingPrice * activeTime * quantityDays
            // }
            // this.campaign.time_period = this.$helpers.removeKeys(this.timeSelection, ['time', 'disabled']);
            this.campaign.cost_campaign = total;
            this.campaign.count_view = countView;
            this.updateStore();
        },
        getRegions() {
            app.getRegions(this.campaign.ads_type).then(res => {
                this.regions = res;
            }).catch(err => {
                this.$store.dispatch('showError', err);
                console.error(err);
            });
        },
        isCheckAdsType(value) {
            return this.campaign.ads_type_str === value
        },
        countingDays(days, type) {
            if (type) {
                let weekends = 0;
                let weekdays = 0;
                days.map(day => {
                    const startDate = new Date(day.campaign_start);
                    const endDate = new Date(day.campaign_end);
                    let currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        const dayOfWeek = currentDate.getDay();
                        if (dayOfWeek === 0 || dayOfWeek === 6) {
                            weekends++;
                        } else {
                            weekdays++;
                        }
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                })
                if (type === 'Выходные') {
                    return weekends;
                } else if (type === 'Ежедневно') {
                    return this.countingDays(days);
                } else {
                    return weekdays
                }
            } else {
                return days.reduce((total, day) => {
                    if (day.campaign_start && day.campaign_end) {
                        const startDate = new Date(day.campaign_start);
                        const endDate = new Date(day.campaign_end);
                        const diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
                        return total + diffInDays + 1;
                    } else {
                        return total;
                    }
                }, 0);
            }
        },
        countingTime(isTable, data) {
            if (isTable) {
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        if (data[i][j] === '1') {
                            count++;
                        }
                    }
                }
                return count;
            } else {
                let count = 0;
                data.map(item => {
                    if (item.type === 'Будни') {
                        // const startIndex = this.activeTime.weekday.indexOf(item.period_start);
                        // const endIndex = this.activeTime.weekday.indexOf(item.period_end);
                        console.log('time', 'item.period_start', item.period_start, 'item.period_end', item.period_end);
                    }
                })
                return count;
            }
        },
        addCompanyPeriod() {
            this.campaign.campaign_schedule_data.push({});
        },
        deleteCompanyPeriod(index) {
            this.campaign.campaign_schedule_data.splice(index, 1);
            this.gettingActiveDays();
        },
        changeScheduleData(time_schedule_data) {
            this.campaign.time_schedule_data = time_schedule_data;
            this.totalPrice();
        },
        changeCampaignStartDate(day) {
            if (day.id) {
                this.campaignStartDateError = null;
            }
            this.gettingActiveDays();
        },
        changeCampaignEndDate(day) {
            if (day.id) {
                this.campaignEndDateError = null;
            }
            this.gettingActiveDays();
        },
        selectAdsFile(newFile, oldFile) {
            this.adsFile.error = '';
            if (!this.$refs.upload.active && newFile) {
                let file = newFile.file;
                Promise.resolve(this.$helpers.getFileInfo(file, 'audio')).then((result) => {
                    //if (result.length) {
                    let file = result;
                    if (Math.round(file.duration) > 20) {
                        this.adsFile.error = 'Длина ролика превышает 20 сек.';
                        this.adsFile.file = null;
                    } else {
                        this.$refs.upload.active = true;
                        this.adsFile.file = file.song;
                        this.adsFile.name = file.file.name;
                        this.adsFile.file.addEventListener('timeupdate', () => {
                            this.adsFile.time = this.adsFile.file.currentTime.toFixed(2);
                            this.adsFile.play = !this.adsFile.file.paused;
                        });
                    }
                    //}
                });
            } else {
                if (newFile && oldFile && !newFile.active && oldFile.active) {
                    if (newFile.xhr) {
                        if (newFile.xhr.status !== 201) {
                            this.adsFile.error = newFile.response.detail || 'Ошибка загрузки файла!';
                            this.adsFile.file = null;
                            this.adsFile.uploaded = false;
                        } else {
                            this.campaign.ads_file = newFile.response.id;
                            this.adsFile.uploaded = true;
                        }
                    }
                }
            }
        },
        onSubmit() {
            this.totalPrice();
            let errors = false;
            if (this.totalPrice() === 0) {
                errors = true;
            }
            if (!this.adsFile.file && this.campaign.ads_type_str === 'audio') {
                errors = true;
            }
            this.updateStore({...this.campaign, step: 3});
            if (!errors) {
                // this.showLoaderSending = true;
                this.$store.dispatch('updateCampaign', {campaign: this.campaign});
                this.$store.dispatch('setCampaignStep', {campaign_step: 2});
                this.next();
            }
        },
        next() {
            this.$router.push({name: 'campaignPay'});
        },
        playAdsFile() {
            this.adsFile.play = true;
            if (this.adsFile.file) {
                this.adsFile.file.play();
            }
        },
        stopAdsFile() {
            this.adsFile.play = false;
            if (this.adsFile.file) {
                this.adsFile.file.pause();
            }
        },
        deleteAdsFile() {
            if (this.campaign.ads_file) {
                this.stopAdsFile();
                app.deleteAdsFile(this.campaign.ads_file).then(() => {
                    this.files = [];
                    this.adsFile = {
                        uploaded: false,
                        error: '',
                        file: null
                    };
                    this.campaign.ads_file = null;
                    this.updateStore();
                }).catch(err => {
                    console.error(err);
                    this.$store.dispatch('showError', err);
                });
            }
        },
        gettingActiveDays() {
            this.campaign.time_period = [];
            const daysName = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            const activeDays = [];
            this.campaign.campaign_schedule_data.forEach(obj => {
                const startDate = new Date(obj.campaign_start);
                const endDate = new Date(obj.campaign_end);
                while (startDate <= endDate) {
                    const dayIndex = startDate.getDay();
                    activeDays.push(daysName[dayIndex]);
                    startDate.setDate(startDate.getDate() + 1);
                }
            });
            this.activeDay = Array.from(new Set(activeDays));
        },
        gettingActiveTime(dayType, startTime, endTime, typeChange) {
            let startIndex = 0;
            let endIndex = 0;
            if (dayType === 'Будни') {
                startIndex = this.activeTime.weekday.indexOf(startTime);
                endIndex = this.activeTime.weekday.indexOf(endTime);
                return typeChange === 'start' ? this.activeTime.weekday.slice(0, endIndex + 1) : this.activeTime.weekday.slice(startIndex, this.activeTime.weekday.length);
            } else {
                startIndex = this.activeTime.weekend.indexOf(startTime);
                endIndex = this.activeTime.weekend.indexOf(endTime);
                return typeChange === 'start' ? this.activeTime.weekend.slice(0, endIndex + 1) : this.activeTime.weekend.slice(startIndex, this.activeTime.weekend.length);
            }
        },
        isDisabledTimeSelection(dayType) {
            const daysName = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            if (dayType === 'Будни') {
                return !this.activeDay.some(day => daysName.includes(day) && day !== 'Вс' && day !== 'Сб');
            }
            return !(this.activeDay.includes('Сб') || this.activeDay.includes('Вс'));
        },
        changeActiveTime() {
            this.campaign.time_period = this.timeSelection;
            this.totalPrice();
        },
        updateStore(params) {
            this.$store.dispatch('updateCampaign', {campaign: params || this.campaign});
        }
    }
};
</script>
