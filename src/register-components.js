/**
 * Register Components.
 * 
 * Place and enable global components into this file.
 */

// Application Components
import ApplicationLogo from "./components/application/logo.vue";

// Layout Components
import LayoutsAuth from "./components/layouts/auth/index.vue";
import LayoutsContainer from "./components/layouts/utils/container.vue";
import LayoutsPanel from "./components/layouts/panel/index.vue";

// Regular Components
import Badge from "./components/badge.vue";
import Button from "./components/button.vue";
import CardContent from "./components/card-content.vue";
import CardFooter from "./components/card-footer.vue";
import Card from "./components/card.vue";
import Container from "./components/container.vue";
import FormCheckbox from "./components/form/checkbox.vue";
import FormEditor from "./components/form/editor.vue";
import FormGroup from "./components/form/group.vue";
import FormInput from "./components/form/input.vue";
import FormLabel from "./components/form/label.vue";
import FormSelect from "./components/form/select.vue";
import Form from "./components/form/form.vue";
import Icon from "./components/icon.vue";
import Iframe from "./components/iframe.vue";
import Link from "./components/link.vue";
import SectionHeader from "./components/section-header.vue";
import SectionToolbar from "./components/section-toolbar.vue";
import Section from "./components/section.vue";
import TableTata from "./components/table-data.vue";
import TableHeader from "./components/table-header.vue";
import TableRow from "./components/table-row.vue";
import Table from "./components/table.vue";
import Text from "./components/text.vue";
import VerticalMenuHeader from "./components/vertical-menu-header.vue";
import VerticalMenuItem from "./components/vertical-menu-item.vue";
import VerticalScroll from "./components/vertical-scroll.vue";

// Plugin Components
import { FontAwesomeIcon } from "./plugins/icons/index.js";

const components = {
    "x-badge": Badge,
    "x-button": Button,
    "x-card-content": CardContent,
    "x-card-footer": CardFooter,
    "x-card": Card,
    "x-container": Container,
    "x-form-checkbox": FormCheckbox,
    "x-form-editor": FormEditor,
    "x-form-group": FormGroup,
    "x-form-input": FormInput,
    "x-form-label": FormLabel,
    "x-form-select": FormSelect,
    "x-form": Form,
    "x-icon": Icon,
    "x-iframe": Iframe,
    "x-link": Link,
    "x-section-header": SectionHeader,
    "x-section-toolbar": SectionToolbar,
    "x-section": Section,
    "x-table-data": TableTata,
    "x-table-header": TableHeader,
    "x-table-row": TableRow,
    "x-table": Table,
    "x-text": Text,
    "x-vertical-menu-header": VerticalMenuHeader,
    "x-vertical-menu-item": VerticalMenuItem,
    "x-vertical-scroll": VerticalScroll,
};

const registerComponents = (app = null) => {
    // Application Components
    app.component("x-application-logo", ApplicationLogo);

    // Layout Components
    app.component("x-layouts-auth", LayoutsAuth);
    app.component("x-layouts-container", LayoutsContainer);
    app.component("x-layouts-panel", LayoutsPanel);

    Object.keys(components).forEach((key) => {
        app.component(key, components[key]);
    });

    // Plugin Components
    app.component("fa", FontAwesomeIcon);
};

export default registerComponents;

