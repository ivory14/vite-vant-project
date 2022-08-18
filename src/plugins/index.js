import {
  Button, Tabbar, TabbarItem, Tab, Tabs, Icon, Picker, Popup, Overlay,
  Loading, Divider, PullRefresh, Toast, RadioGroup, Radio, List, Cell, Dialog, DatetimePicker, SubmitBar, Checkbox, Image
} from 'vant';

const components = [
  Button, Tabbar, TabbarItem, Tab, Tabs, Icon, Picker, Popup, Overlay,
  Loading, Divider, PullRefresh, Toast, RadioGroup, Radio, List, Cell, Dialog, DatetimePicker, SubmitBar, Checkbox, Image
];

export default (app) => {
  components.forEach(component => {
    app.use(component);
  });
};