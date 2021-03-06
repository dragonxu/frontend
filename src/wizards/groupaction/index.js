/*
 * Copyright (C) 2016 OpenMotics BVBA
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import {inject, useView, Factory} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {DialogController} from 'aurelia-dialog';
import {BaseWizard} from '../basewizard';
import {Data} from './data';
import {Change} from './change';

@useView(PLATFORM.moduleName('wizards/basewizard.html'))
@inject(DialogController, Factory.of(Change))
export class GroupActionWizard extends BaseWizard {
    constructor(controller, changeFactory, ...rest) {
        super(controller, ...rest);
        this.data = new Data();
        this.steps = [
            changeFactory(this.data)
        ];
    }

    async activate(options) {
        this.data.groupAction = options.groupAction;
        this.data.isNew = options.new;
        if (this.data.isNew) {
            this.steps[0].title = `${this.i18n.tr('wizards.groupaction.create')} ${this.i18n.tr('generic.groupaction')}`;
        } else {
            this.steps[0].title = `${this.i18n.tr('wizards.groupaction.edit')} ${this.i18n.tr('generic.groupaction')}`;
        }
        this.data.groupAction._freeze = true;
        return this.loadStep(this.filteredSteps[0]);
    }

    attached() {
        super.attached();
    }
}
