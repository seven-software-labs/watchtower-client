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
import Card from "./components/card.vue";
import CardContent from "./components/card-content.vue";
import Container from "./components/container.vue";
import FormCheckbox from "./components/form/checkbox.vue";
import Icon from "./components/icon.vue";
import SectionHeader from "./components/section-header.vue";
import Table from "./components/table.vue";
import TableTata from "./components/table-data.vue";
import TableHeader from "./components/table-header.vue";
import TableRow from "./components/table-row.vue";
import Text from "./components/text.vue";
import Link from "./components/link.vue";

const components = {
    "x-badge": Badge,
    "x-button": Button,
    "x-card": Card,
    "x-card-content": CardContent,
    "x-container": Container,
    "x-form-checkbox": FormCheckbox,
    "x-icon": Icon,
    "x-section-header": SectionHeader,
    "x-table": Table,
    "x-table-data": TableTata,
    "x-table-header": TableHeader,
    "x-table-row": TableRow,
    "x-text": Text,
    "x-link": Link,
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
};

export default registerComponents;

