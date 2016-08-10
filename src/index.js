import {I18N, BaseI18N} from "aurelia-i18n";
import {AdminLTE} from "admin-lte";
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {API} from "./components/api";

@inject(API, I18N, Element, EventAggregator)
export class Index extends BaseI18N {
    constructor(api, i18n, element, ea) {
        super(i18n, element, ea);
        this.api = api;
    };

    // Aurelia
    configureRouter(config, router) {
        config.title = 'OpenMotics';
        config.map([
            {
                route: ['', 'dashboard'], name: 'dashboard', moduleId: 'pages/dashboard', nav: true,
                settings: {key: 'dashboard', title: this.i18n.tr('pages.dashboard.title')}
            },
            {
                route: 'outputs', name: 'outputs', moduleId: 'pages/outputs', nav: true,
                settings: {key: 'outputs', title: this.i18n.tr('pages.outputs.title')}
            },
            {
                route: 'groupactions', name: 'groupactions', moduleId: 'pages/groupactions', nav: true,
                settings: {key: 'groupactions', title: this.i18n.tr('pages.groupactoins.title')}
            },
            {
                route: 'thermostats', name: 'thermostats', moduleId: 'pages/thermostats', nav: true,
                settings: {key: 'thermostats', title: this.i18n.tr('pages.thermostats.title')}
            },
            {
                route: 'plugins', name: 'plugins', moduleId: 'pages/plugins', nav: true,
                settings: {key: 'plugins', title: this.i18n.tr('pages.plugins.tigle')}
            },
            {
                route: 'logout', name: 'logout', moduleId: 'pages/logout', nav: false,
                settings: {}
            }
        ])
        ;
        this.router = router;
    };

    attached() {
        window.addEventListener('aurelia-composed', $.AdminLTE.layout.fix);
        window.addEventListener('resize', $.AdminLTE.layout.fix);
    };

    detached() {
        window.removeEventListener('aurelia-composed', $.AdminLTE.layout.fix);
        window.removeEventListener('resize', $.AdminLTE.layout.fix);
    };
}