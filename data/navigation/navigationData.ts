export enum pageGroups {
    Forms = 'Forms',
    ModalOverlays = 'Modal & Overlays',
    ExtraComponents = 'Extra Components',
    Charts = 'Charts',
    TablesData = 'Tables & Data',
    Auth = 'Auth',
}

export interface iWebPage {
    pageName: string;
    pageUrl: string;
}

export const FormLayouts: iWebPage = {
    pageName: 'Form Layouts',
    pageUrl: '/pages/forms/layouts',
};

export const DatePicker: iWebPage = {
    pageName: 'Datepicker',
    pageUrl: '/pages/forms/layouts',
};

export const iotDashboard: iWebPage = {
    pageName: 'IoT Dashboard',
    pageUrl: '/pages/iot-dashboard',
};

export const webPagesModalOverlays = {
    Dialog: 'pages/modal-overlays/dialog',
    Window: 'pages/modal-overlays/window',
    Popover: 'pages/modal-overlays/popover',
    Toastr: 'pages/modal-overlays/toastr',
    Tooltip: 'pages/modal-overlays/tooltip',
};

export const extWebPage = {
    DragDropAndIframe: 'https://globalsqa.com/demo-site/draganddrop/',
};

export const intWebPage = {
    FormLayouts: `${process.env.URL}/pages/forms/layouts`,
};
