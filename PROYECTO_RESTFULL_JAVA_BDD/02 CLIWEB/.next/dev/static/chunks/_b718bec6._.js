(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function Header() {
    _s();
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            setUsuario(localStorage.getItem('usuario') || '');
        }
    }["Header.useEffect"], []);
    const handleLogout = ()=>{
        localStorage.removeItem('usuario');
        window.location.href = '/login';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "text-white px-5 py-4 border-b-2",
        style: {
            backgroundColor: 'var(--bg-header)',
            borderBottomColor: 'var(--primary-dark)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-3xl",
                            children: "🏛️"
                        }, void 0, false, {
                            fileName: "[project]/components/header.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold",
                            children: "ESPE - Comercializadora Electrodomésticos"
                        }, void 0, false, {
                            fileName: "[project]/components/header.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/header.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium text-lg",
                            children: [
                                "👤 ",
                                usuario
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/header.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "px-4 py-2 rounded font-medium text-white",
                            style: {
                                backgroundColor: 'var(--danger)'
                            },
                            children: "🔒 Cerrar sesión"
                        }, void 0, false, {
                            fileName: "[project]/components/header.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/header.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/header.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/header.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(Header, "2Wu2IvTtraiJ8CR85IDn7TmB+/s=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Sidebar({ activePanel, onPanelChange }) {
    const menuItems = [
        {
            id: 'productos',
            icon: '📦',
            label: 'Productos'
        },
        {
            id: 'facturacion',
            icon: '🧾',
            label: 'Facturación'
        },
        {
            id: 'credito',
            icon: '💳',
            label: 'Crédito'
        },
        {
            id: 'conectividad',
            icon: '🔧',
            label: 'Conectividad'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-48 text-white flex flex-col border-r",
        style: {
            backgroundColor: 'var(--bg-sidebar)',
            borderRightColor: 'var(--dark-gray)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 p-3 space-y-2",
                children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPanelChange(item.id),
                        className: "w-full text-left px-4 py-3 rounded font-medium transition flex items-center gap-3",
                        style: {
                            backgroundColor: activePanel === item.id ? 'var(--primary)' : 'transparent',
                            color: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/components/sidebar.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/components/sidebar.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/sidebar.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/sidebar.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t p-4 text-center text-sm",
                style: {
                    borderTopColor: 'var(--dark-gray)',
                    color: 'var(--light-gray)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium",
                        children: "Escuela Politécnica Nacional del Ejército"
                    }, void 0, false, {
                        fileName: "[project]/components/sidebar.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-2",
                        style: {
                            color: 'var(--medium-gray)'
                        },
                        children: "v1.0.0"
                    }, void 0, false, {
                        fileName: "[project]/components/sidebar.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/sidebar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/sidebar.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/status-bar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function StatusBar({ message, connectionStatus, protocol }) {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusBar.useEffect": ()=>{
            const updateTime = {
                "StatusBar.useEffect.updateTime": ()=>{
                    setTime(new Date().toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }));
                }
            }["StatusBar.useEffect.updateTime"];
            updateTime();
            const interval = setInterval(updateTime, 1000);
            return ({
                "StatusBar.useEffect": ()=>clearInterval(interval)
            })["StatusBar.useEffect"];
        }
    }["StatusBar.useEffect"], []);
    const getMessageIcon = ()=>{
        switch(message.type){
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'loading':
                return '⏳';
            case 'info':
                return 'ℹ️';
            default:
                return '';
        }
    };
    const getMessageColor = ()=>{
        switch(message.type){
            case 'success':
                return 'var(--success)';
            case 'error':
                return 'var(--danger)';
            case 'warning':
                return 'var(--warning)';
            case 'loading':
                return 'var(--info)';
            case 'info':
                return 'var(--info)';
            default:
                return 'var(--dark-gray)';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t px-4 py-2 flex items-center justify-between text-sm",
        style: {
            backgroundColor: 'var(--light-gray)',
            borderTopColor: 'var(--medium-gray)',
            color: 'var(--medium-gray)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                style: {
                    color: getMessageColor()
                },
                children: [
                    message.type !== 'default' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: getMessageIcon()
                    }, void 0, false, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 67,
                        columnNumber: 40
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: message.text
                    }, void 0, false, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/status-bar.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1",
                        children: [
                            connectionStatus.connected ? '🟢' : '🔴',
                            connectionStatus.connected ? 'Conectado' : 'Desconectado'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: 'var(--medium-gray)'
                        },
                        children: "│"
                    }, void 0, false, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-2 py-0.5 rounded text-white",
                        style: {
                            backgroundColor: 'var(--primary)'
                        },
                        children: protocol
                    }, void 0, false, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: 'var(--medium-gray)'
                        },
                        children: "│"
                    }, void 0, false, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/components/status-bar.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/status-bar.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/status-bar.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(StatusBar, "PsMgnLgzzQiamQWS0F3M3yb0/nk=");
_c = StatusBar;
var _c;
__turbopack_context__.k.register(_c, "StatusBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClienteUnificado",
    ()=>ClienteUnificado,
    "clienteUnificado",
    ()=>clienteUnificado
]);
const BASE_COMERCIALIZADORA = "http://localhost:8080/ComercializadoraElectrodomesticos/api";
const BASE_BANQUITO = "http://localhost:8080/BanquitoCore/api/credito";
class ClienteUnificado {
    protocoloActual = "REST";
    setProtocolo(protocolo) {
        this.protocoloActual = protocolo;
    }
    // ========== ELECTRODOMÉSTICOS ==========
    async listarElectrodomesticos() {
        if (this.protocoloActual === "REST") {
            return this.listarElectrodomesticosREST();
        }
        throw new Error("SOAP no implementado aún");
    }
    async obtenerElectrodomestico(id) {
        if (this.protocoloActual === "REST") {
            return this.obtenerElectrodomesticoREST(id);
        }
        throw new Error("SOAP no implementado aún");
    }
    async crearElectrodomestico(producto) {
        if (this.protocoloActual === "REST") {
            return this.crearElectrodomesticoREST(producto);
        }
        throw new Error("SOAP no implementado aún");
    }
    async actualizarElectrodomestico(id, producto) {
        if (this.protocoloActual === "REST") {
            return this.actualizarElectrodomesticoREST(id, producto);
        }
        throw new Error("SOAP no implementado aún");
    }
    async eliminarElectrodomestico(id) {
        if (this.protocoloActual === "REST") {
            return this.eliminarElectrodomesticoREST(id);
        }
        throw new Error("SOAP no implementado aún");
    }
    // ========== FACTURACIÓN ==========
    async procesarVentaEfectivo(solicitud) {
        if (this.protocoloActual === "REST") {
            return this.procesarVentaEfectivoREST(solicitud);
        }
        throw new Error("SOAP no implementado aún");
    }
    async procesarVentaCredito(solicitud) {
        if (this.protocoloActual === "REST") {
            return this.procesarVentaCreditoREST(solicitud);
        }
        throw new Error("SOAP no implementado aún");
    }
    // ========== CRÉDITO BANQUITO ==========
    async validarSujetoCredito(cedula) {
        if (this.protocoloActual === "REST") {
            return this.validarSujetoCreditoREST(cedula);
        }
        throw new Error("SOAP no implementado aún");
    }
    async obtenerMontoMaximo(cedula) {
        if (this.protocoloActual === "REST") {
            return this.obtenerMontoMaximoREST(cedula);
        }
        throw new Error("SOAP no implementado aún");
    }
    async obtenerTablaAmortizacion(idCredito) {
        if (this.protocoloActual === "REST") {
            return this.obtenerTablaAmortizacionREST(idCredito);
        }
        throw new Error("SOAP no implementado aún");
    }
    // ========== CONECTIVIDAD ==========
    async probarConectividad() {
        try {
            const testBanquito = await this.testBanquitoREST();
            const testComercializadora = await this.listarElectrodomesticosREST();
            return testBanquito && testComercializadora;
        } catch  {
            return false;
        }
    }
    // ========== REST IMPLEMENTATIONS ==========
    async listarElectrodomesticosREST() {
        const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos`, {
            method: "GET"
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    }
    async obtenerElectrodomesticoREST(id) {
        const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos/${id}`, {
            method: "GET"
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    }
    async crearElectrodomesticoREST(producto) {
        try {
            const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(producto)
            });
            return await response.json();
        } catch (error) {
            return {
                exito: false,
                mensaje: `Error al crear producto: ${error}`
            };
        }
    }
    async actualizarElectrodomesticoREST(id, producto) {
        try {
            const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(producto)
            });
            return await response.json();
        } catch (error) {
            return {
                exito: false,
                mensaje: `Error al actualizar producto: ${error}`
            };
        }
    }
    async eliminarElectrodomesticoREST(id) {
        try {
            const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos/${id}`, {
                method: "DELETE"
            });
            return await response.json();
        } catch (error) {
            return {
                exito: false,
                mensaje: `Error al eliminar producto: ${error}`
            };
        }
    }
    async procesarVentaEfectivoREST(solicitud) {
        try {
            const response = await fetch(`${BASE_COMERCIALIZADORA}/facturacion/venta-efectivo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(solicitud)
            });
            return await response.json();
        } catch (error) {
            return {
                exito: false,
                mensaje: `Error al procesar venta: ${error}`
            };
        }
    }
    async procesarVentaCreditoREST(solicitud) {
        try {
            const response = await fetch(`${BASE_COMERCIALIZADORA}/facturacion/venta-credito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(solicitud)
            });
            return await response.json();
        } catch (error) {
            return {
                exito: false,
                mensaje: `Error al procesar venta a crédito: ${error}`
            };
        }
    }
    async validarSujetoCreditoREST(cedula) {
        try {
            const response = await fetch(`${BASE_BANQUITO}/validar/${cedula}`, {
                method: "GET"
            });
            if (response.ok) {
                return await response.json();
            }
            return {
                sujetoCredito: false,
                mensaje: "Error en el servicio de validación"
            };
        } catch (error) {
            return {
                sujetoCredito: false,
                mensaje: `Error de conexión: ${error}`
            };
        }
    }
    async obtenerMontoMaximoREST(cedula) {
        try {
            const response = await fetch(`${BASE_BANQUITO}/monto-maximo/${cedula}`, {
                method: "GET"
            });
            if (response.ok) {
                return await response.json();
            }
            return {
                aprobado: false,
                mensaje: "Error en el servicio"
            };
        } catch (error) {
            return {
                aprobado: false,
                mensaje: `Error de conexión: ${error}`
            };
        }
    }
    async obtenerTablaAmortizacionREST(idCredito) {
        try {
            const response = await fetch(`${BASE_BANQUITO}/tabla-amortizacion/${idCredito}`, {
                method: "GET"
            });
            if (response.ok) {
                return await response.json();
            }
            return {
                encontrado: false,
                mensaje: "Tabla de amortización no encontrada"
            };
        } catch (error) {
            return {
                encontrado: false,
                mensaje: `Error de conexión: ${error}`
            };
        }
    }
    async testBanquitoREST() {
        try {
            const response = await fetch(`${BASE_BANQUITO}/test`, {
                method: "GET"
            });
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch  {
            return null;
        }
    }
}
const clienteUnificado = new ClienteUnificado();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/panels/productos-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductosPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Modal para crear/editar productos
function ProductoModal({ isOpen, producto, onClose, onSave }) {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(producto || {
        idElectrodomestico: 0,
        codigo: '',
        nombre: '',
        descripcion: '',
        marca: '',
        precioVenta: 0,
        stock: 0,
        estado: 'DISPONIBLE'
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductoModal.useEffect": ()=>{
            if (producto) {
                setFormData(producto);
            }
        }
    }["ProductoModal.useEffect"], [
        producto,
        isOpen
    ]);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: name === 'precioVenta' || name === 'stock' ? parseFloat(value) : value
            }));
    };
    const validateForm = ()=>{
        if (!formData.codigo.trim()) {
            setError('El código es requerido');
            return false;
        }
        if (!formData.nombre.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (formData.precioVenta <= 0) {
            setError('El precio debe ser mayor a 0');
            return false;
        }
        if (formData.stock < 0) {
            setError('El stock no puede ser negativo');
            return false;
        }
        setError('');
        return true;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally{
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg p-6 w-full max-w-md",
            style: {
                backgroundColor: 'white',
                borderTop: `4px solid var(--primary)`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold mb-4",
                    style: {
                        color: 'var(--primary)'
                    },
                    children: producto ? 'Editar Producto' : 'Agregar Producto'
                }, void 0, false, {
                    fileName: "[project]/components/panels/productos-panel.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 rounded text-sm",
                    style: {
                        backgroundColor: 'var(--danger)',
                        color: 'white'
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/panels/productos-panel.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    style: {
                                        color: 'var(--dark-gray)'
                                    },
                                    children: "Código *"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "codigo",
                                    value: formData.codigo,
                                    onChange: handleChange,
                                    className: "w-full px-3 py-2 border rounded",
                                    style: {
                                        borderColor: 'var(--medium-gray)'
                                    },
                                    disabled: loading || !!producto
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    style: {
                                        color: 'var(--dark-gray)'
                                    },
                                    children: "Nombre *"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "nombre",
                                    value: formData.nombre,
                                    onChange: handleChange,
                                    className: "w-full px-3 py-2 border rounded",
                                    style: {
                                        borderColor: 'var(--medium-gray)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    style: {
                                        color: 'var(--dark-gray)'
                                    },
                                    children: "Descripción"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    name: "descripcion",
                                    value: formData.descripcion,
                                    onChange: handleChange,
                                    className: "w-full px-3 py-2 border rounded",
                                    style: {
                                        borderColor: 'var(--medium-gray)'
                                    },
                                    rows: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    style: {
                                        color: 'var(--dark-gray)'
                                    },
                                    children: "Marca"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "marca",
                                    value: formData.marca,
                                    onChange: handleChange,
                                    className: "w-full px-3 py-2 border rounded",
                                    style: {
                                        borderColor: 'var(--medium-gray)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            style: {
                                                color: 'var(--dark-gray)'
                                            },
                                            children: "Precio *"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "precioVenta",
                                            value: formData.precioVenta,
                                            onChange: handleChange,
                                            step: "0.01",
                                            min: "0",
                                            className: "w-full px-3 py-2 border rounded",
                                            style: {
                                                borderColor: 'var(--medium-gray)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            style: {
                                                color: 'var(--dark-gray)'
                                            },
                                            children: "Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "stock",
                                            value: formData.stock,
                                            onChange: handleChange,
                                            min: "0",
                                            className: "w-full px-3 py-2 border rounded",
                                            style: {
                                                borderColor: 'var(--medium-gray)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    style: {
                                        color: 'var(--dark-gray)'
                                    },
                                    children: "Estado"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    name: "estado",
                                    value: formData.estado,
                                    onChange: handleChange,
                                    className: "w-full px-3 py-2 border rounded",
                                    style: {
                                        borderColor: 'var(--medium-gray)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "DISPONIBLE",
                                            children: "Disponible"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "INACTIVO",
                                            children: "Inactivo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    disabled: loading,
                                    className: "flex-1 px-4 py-2 rounded font-medium text-white",
                                    style: {
                                        backgroundColor: 'var(--medium-gray)'
                                    },
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "flex-1 px-4 py-2 rounded font-medium text-white",
                                    style: {
                                        backgroundColor: 'var(--success)'
                                    },
                                    children: loading ? 'Guardando...' : 'Guardar'
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/productos-panel.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/panels/productos-panel.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/panels/productos-panel.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/panels/productos-panel.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(ProductoModal, "AERtG0VCbfOorhdsFabm8fkS7yk=");
_c = ProductoModal;
function ProductosPanel({ setStatus }) {
    _s1();
    const [productos, setProductos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedRow, setSelectedRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingProducto, setEditingProducto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductosPanel.useEffect": ()=>{
            cargarProductos();
        }
    }["ProductosPanel.useEffect"], []);
    const cargarProductos = async ()=>{
        setLoading(true);
        setStatus({
            text: 'Cargando productos...',
            type: 'loading'
        });
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].listarElectrodomesticos();
            if (result) {
                setProductos(result);
                setStatus({
                    text: `Productos cargados: ${result.length}`,
                    type: 'success'
                });
            } else {
                // Fallback a datos simulados si no hay conexión
                const productosSimulados = [
                    {
                        idElectrodomestico: 1,
                        codigo: 'REF001',
                        nombre: 'Refrigerador 18 pies',
                        descripcion: 'Refrigerador de doble puerta con congelador',
                        marca: 'LG',
                        precioVenta: 1200,
                        stock: 5,
                        estado: 'Activo'
                    },
                    {
                        idElectrodomestico: 2,
                        codigo: 'LAV001',
                        nombre: 'Lavadora Automática',
                        descripcion: 'Lavadora de 8kg con ciclos automáticos',
                        marca: 'Samsung',
                        precioVenta: 800,
                        stock: 3,
                        estado: 'Activo'
                    },
                    {
                        idElectrodomestico: 3,
                        codigo: 'TV001',
                        nombre: 'TV LED 55"',
                        descripcion: 'Televisor LED 55 pulgadas 4K',
                        marca: 'Sony',
                        precioVenta: 650,
                        stock: 8,
                        estado: 'Activo'
                    }
                ];
                setProductos(productosSimulados);
                setStatus({
                    text: 'Usando datos simulados (servidor no disponible)',
                    type: 'warning'
                });
            }
        } catch (error) {
            setStatus({
                text: 'Error al cargar productos',
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    const handleAgregar = ()=>{
        setEditingProducto(undefined);
        setModalOpen(true);
    };
    const handleEditar = ()=>{
        if (selectedRow === null) {
            setStatus({
                text: 'Seleccione un producto para editar',
                type: 'warning'
            });
            return;
        }
        const producto = productosFiltrados[selectedRow];
        setEditingProducto(producto);
        setModalOpen(true);
    };
    const handleEliminar = async ()=>{
        if (selectedRow === null) {
            setStatus({
                text: 'Seleccione un producto para eliminar',
                type: 'warning'
            });
            return;
        }
        const producto = productosFiltrados[selectedRow];
        const confirmacion = window.confirm(`¿Está seguro de eliminar el producto?\n\nCódigo: ${producto.codigo}\nNombre: ${producto.nombre}\n\nEsta acción no se puede deshacer.`);
        if (!confirmacion) return;
        setLoading(true);
        setStatus({
            text: 'Eliminando producto...',
            type: 'loading'
        });
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].eliminarElectrodomestico(producto.idElectrodomestico);
            if (result && result.exito) {
                setStatus({
                    text: 'Producto eliminado correctamente',
                    type: 'success'
                });
                setSelectedRow(null);
                await cargarProductos();
            } else {
                const error = result?.mensaje || 'Error desconocido';
                setStatus({
                    text: `Error al eliminar: ${error}`,
                    type: 'error'
                });
            }
        } catch (error) {
            setStatus({
                text: `Error: ${error instanceof Error ? error.message : 'desconocido'}`,
                type: 'error'
            });
        } finally{
            setLoading(false);
        }
    };
    const handleSaveProducto = async (formData)=>{
        setStatus({
            text: editingProducto ? 'Actualizando producto...' : 'Creando producto...',
            type: 'loading'
        });
        try {
            let result;
            if (editingProducto) {
                result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].actualizarElectrodomestico(editingProducto.idElectrodomestico, formData);
            } else {
                result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].crearElectrodomestico(formData);
            }
            if (result && result.exito) {
                setStatus({
                    text: editingProducto ? 'Producto actualizado correctamente' : 'Producto creado correctamente',
                    type: 'success'
                });
                setSelectedRow(null);
                await cargarProductos();
            } else {
                const error = result?.mensaje || 'Error desconocido';
                throw new Error(`Error al guardar: ${error}`);
            }
        } catch (error) {
            throw error;
        }
    };
    const productosFiltrados = productos.filter((p)=>p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) || p.marca.toLowerCase().includes(searchTerm.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "text",
                        placeholder: "Buscar por nombre o código...",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: cargarProductos,
                        disabled: loading,
                        className: "px-4 py-2 rounded font-medium text-white",
                        style: {
                            backgroundColor: 'var(--info)'
                        },
                        children: "🔄 Actualizar"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleAgregar,
                        disabled: loading,
                        className: "px-4 py-2 rounded font-medium text-white",
                        style: {
                            backgroundColor: 'var(--success)'
                        },
                        children: "➕ Agregar"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleEditar,
                        disabled: loading || selectedRow === null,
                        className: "px-4 py-2 rounded font-medium text-white",
                        style: {
                            backgroundColor: 'var(--primary)'
                        },
                        children: "✏️ Editar"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleEliminar,
                        disabled: loading || selectedRow === null,
                        className: "px-4 py-2 rounded font-medium text-white",
                        style: {
                            backgroundColor: 'var(--danger)'
                        },
                        children: "🗑️ Eliminar"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 415,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/productos-panel.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto border rounded",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                style: {
                                    backgroundColor: 'var(--primary)',
                                    color: 'white'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-2 text-left font-semibold",
                                            children: "Código"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-2 text-left font-semibold",
                                            children: "Nombre"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 433,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-2 text-left font-semibold",
                                            children: "Marca"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-2 text-center font-semibold",
                                            children: "Precio"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 435,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-2 text-center font-semibold",
                                            children: "Stock"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-2 text-center font-semibold",
                                            children: "Estado"
                                        }, void 0, false, {
                                            fileName: "[project]/components/panels/productos-panel.tsx",
                                            lineNumber: 437,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/panels/productos-panel.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: productosFiltrados.map((producto, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        onClick: ()=>setSelectedRow(idx),
                                        style: {
                                            borderBottom: '1px solid var(--light-gray)',
                                            backgroundColor: selectedRow === idx ? 'var(--primary-light)' : idx % 2 === 0 ? 'white' : 'var(--light-gray)',
                                            cursor: 'pointer',
                                            fontWeight: selectedRow === idx ? 'bold' : 'normal'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2",
                                                children: producto.codigo
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/productos-panel.tsx",
                                                lineNumber: 452,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2",
                                                children: producto.nombre
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/productos-panel.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2",
                                                children: producto.marca
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/productos-panel.tsx",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 text-center font-medium",
                                                children: [
                                                    "$",
                                                    producto.precioVenta.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/panels/productos-panel.tsx",
                                                lineNumber: 455,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 rounded text-white font-medium text-xs",
                                                    style: {
                                                        backgroundColor: producto.stock > 0 ? 'var(--success)' : 'var(--danger)'
                                                    },
                                                    children: producto.stock
                                                }, void 0, false, {
                                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/productos-panel.tsx",
                                                lineNumber: 456,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 rounded text-white text-xs font-medium",
                                                    style: {
                                                        backgroundColor: 'var(--success)'
                                                    },
                                                    children: producto.estado
                                                }, void 0, false, {
                                                    fileName: "[project]/components/panels/productos-panel.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/productos-panel.tsx",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, producto.idElectrodomestico, true, {
                                        fileName: "[project]/components/panels/productos-panel.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/panels/productos-panel.tsx",
                                lineNumber: 440,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    productosFiltrados.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        style: {
                            color: 'var(--medium-gray)'
                        },
                        children: "No hay productos que coincidan con la búsqueda"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/productos-panel.tsx",
                        lineNumber: 478,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/productos-panel.tsx",
                lineNumber: 425,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductoModal, {
                isOpen: modalOpen,
                producto: editingProducto,
                onClose: ()=>{
                    setModalOpen(false);
                    setEditingProducto(undefined);
                },
                onSave: handleSaveProducto
            }, void 0, false, {
                fileName: "[project]/components/panels/productos-panel.tsx",
                lineNumber: 484,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/panels/productos-panel.tsx",
        lineNumber: 382,
        columnNumber: 5
    }, this);
}
_s1(ProductosPanel, "72ZmQK74Vilf9lPqv8SX1zfJ3ns=");
_c1 = ProductosPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProductoModal");
__turbopack_context__.k.register(_c1, "ProductosPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/credit-result-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreditResultDialog",
    ()=>CreditResultDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function CreditResultDialog({ isOpen, onClose, resultado, onViewAmortization }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-md bg-white border shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-green-600 flex items-center gap-2",
                            children: "✅ Venta a Crédito Procesada"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/credit-result-dialog.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 text-sm text-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-3 rounded",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "Tipo de venta:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "CRÉDITO"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "Factura N°:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: resultado.idFactura
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 48,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "Cliente:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: resultado.nombreCliente
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 51,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "Cédula:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: resultado.cedula
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                            lineNumber: 43,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                        lineNumber: 42,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 p-3 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-blue-600 mb-2",
                                                children: "Información del Crédito"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                lineNumber: 59,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "ID Crédito BanQuito:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 61,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-600 font-bold",
                                                        children: resultado.idCreditoBanco
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 62,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "Cuota mensual:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "$",
                                                            resultado.cuotaMensual.toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "Número de cuotas:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: resultado.numeroCuotas
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "Total a pagar:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-green-600",
                                                        children: [
                                                            "$",
                                                            (resultado.cuotaMensual * resultado.numeroCuotas).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                                lineNumber: 60,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                        lineNumber: 58,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/credit-result-dialog.tsx",
                                lineNumber: 41,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/credit-result-dialog.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 justify-end pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onClose,
                            className: "bg-white",
                            children: "Cerrar"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/credit-result-dialog.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onViewAmortization,
                            className: "bg-blue-600 hover:bg-blue-700 text-white",
                            children: "Ver Tabla de Amortización"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/credit-result-dialog.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/credit-result-dialog.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/credit-result-dialog.tsx",
            lineNumber: 35,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/credit-result-dialog.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
_c = CreditResultDialog;
var _c;
__turbopack_context__.k.register(_c, "CreditResultDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/panels/facturacion-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FacturacionPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast-notification.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$credit$2d$result$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/credit-result-dialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function FacturacionPanel({ setStatus, onShowCreditTable }) {
    _s();
    const [productos, setProductos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formulario, setFormulario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cedula: '',
        nombreCliente: '',
        clienteValidado: false,
        idCliente: 0
    });
    const [cantidad, setCantidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [numeroCuotas, setNumeroCuotas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(12);
    const [resultado, setResultado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mostrarResultado, setMostrarResultado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedRowIndex, setSelectedRowIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [validando, setValidando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCreditDialog, setShowCreditDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [creditResult, setCreditResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FacturacionPanel.useEffect": ()=>{
            cargarProductos();
        }
    }["FacturacionPanel.useEffect"], []);
    const cargarProductos = async ()=>{
        setStatus({
            text: 'Cargando productos...',
            type: 'loading'
        });
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].listarElectrodomesticos();
            if (result) {
                setProductos(result);
                setStatus({
                    text: `Productos cargados: ${result.length}`,
                    type: 'success'
                });
            } else {
                // Fallback con datos simulados
                const productosSimulados = [
                    {
                        idElectrodomestico: 1,
                        codigo: 'REF001',
                        nombre: 'Refrigerador 18 pies',
                        descripcion: 'Refrigerador de 18 pies con congelador',
                        marca: 'LG',
                        precioVenta: 1200.0,
                        stock: 5,
                        estado: 'Activo'
                    },
                    {
                        idElectrodomestico: 2,
                        codigo: 'LAV001',
                        nombre: 'Lavadora Automática',
                        descripcion: 'Lavadora automática de carga frontal',
                        marca: 'Samsung',
                        precioVenta: 800.0,
                        stock: 3,
                        estado: 'Activo'
                    },
                    {
                        idElectrodomestico: 3,
                        codigo: 'TV001',
                        nombre: 'TV LED 55"',
                        descripcion: 'Smart TV LED 55 pulgadas',
                        marca: 'Sony',
                        precioVenta: 650.0,
                        stock: 8,
                        estado: 'Activo'
                    }
                ];
                setProductos(productosSimulados);
                setStatus({
                    text: 'Datos simulados (servidor no disponible)',
                    type: 'warning'
                });
            }
        } catch (error) {
            setStatus({
                text: 'Error al cargar productos',
                type: 'error'
            });
        }
    };
    const validarCliente = async ()=>{
        if (!formulario.cedula.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Validación', 'Ingrese la cédula del cliente');
            setStatus({
                text: 'Ingrese la cédula del cliente',
                type: 'warning'
            });
            return;
        }
        setValidando(true);
        setStatus({
            text: 'Validando cliente...',
            type: 'loading'
        });
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].validarSujetoCredito(formulario.cedula);
            if (result?.sujetoCredito) {
                setFormulario((prev)=>({
                        ...prev,
                        clienteValidado: true,
                        idCliente: result.idCliente || 0
                    }));
                setStatus({
                    text: 'Cliente validado correctamente',
                    type: 'success'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showSuccess('Cliente Validado ✅', `${formulario.nombreCliente || 'Cliente'} es apto para crédito. ${result.mensaje || ''}`);
            } else {
                setFormulario((prev)=>({
                        ...prev,
                        clienteValidado: false
                    }));
                setStatus({
                    text: 'Cliente no apto para crédito',
                    type: 'warning'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Cliente No Apto ⚠️', result?.mensaje || 'El cliente no cumple con los requisitos para acceder a crédito');
            }
        } catch (error) {
            setFormulario((prev)=>({
                    ...prev,
                    clienteValidado: false
                }));
            setStatus({
                text: 'Error al validar cliente',
                type: 'error'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showError('Error de Conexión ❌', 'No se pudo validar el cliente. Intente de nuevo o use efectivo.');
        } finally{
            setValidando(false);
        }
    };
    const agregarItem = ()=>{
        if (!selectedProduct) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Seleccionar Producto', 'Seleccione un producto antes de agregar');
            setStatus({
                text: 'Seleccione un producto',
                type: 'warning'
            });
            return;
        }
        if (cantidad <= 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Cantidad Inválida', 'La cantidad debe ser mayor a 0');
            setStatus({
                text: 'Cantidad debe ser mayor a 0',
                type: 'warning'
            });
            return;
        }
        if (cantidad > selectedProduct.stock) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Stock Insuficiente', `Solo hay ${selectedProduct.stock} unidades disponibles`);
            setStatus({
                text: 'Stock insuficiente',
                type: 'warning'
            });
            return;
        }
        const existingItem = items.find((item)=>item.idElectrodomestico === selectedProduct.idElectrodomestico);
        if (existingItem) {
            setItems(items.map((item)=>item.idElectrodomestico === selectedProduct.idElectrodomestico ? {
                    ...item,
                    cantidad: item.cantidad + cantidad
                } : item));
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showInfo('Producto Actualizado', `Cantidad aumentada a ${existingItem.cantidad + cantidad}`);
            setStatus({
                text: 'Cantidad actualizada',
                type: 'success'
            });
        } else {
            setItems([
                ...items,
                {
                    idElectrodomestico: selectedProduct.idElectrodomestico,
                    cantidad,
                    precio: selectedProduct.precioVenta
                }
            ]);
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showSuccess('Producto Agregado ✅', `${selectedProduct.nombre} agregado al carrito`);
            setStatus({
                text: `${selectedProduct.nombre} agregado al carrito`,
                type: 'success'
            });
        }
        setCantidad(1);
        setSelectedProduct(null);
    };
    const removerItem = (index)=>{
        const producto = productos.find((p)=>p.idElectrodomestico === items[index].idElectrodomestico);
        setItems(items.filter((_, i)=>i !== index));
        setSelectedRowIndex(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showInfo('Producto Removido', `${producto?.nombre} eliminado del carrito`);
        setStatus({
            text: 'Producto removido del carrito',
            type: 'success'
        });
    };
    const calcularTotales = ()=>{
        const subtotal = items.reduce((sum, item)=>sum + item.cantidad * item.precio, 0);
        const descuentoEfectivo = subtotal * 0.33;
        const totalEfectivo = subtotal - descuentoEfectivo;
        return {
            subtotal,
            descuentoEfectivo,
            totalEfectivo
        };
    };
    const procesarVentaEfectivo = async ()=>{
        if (!formulario.cedula.trim() || !formulario.nombreCliente.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Datos Incompletos', 'Complete cédula y nombre del cliente');
            setStatus({
                text: 'Complete los datos del cliente',
                type: 'warning'
            });
            return;
        }
        if (items.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Carrito Vacío', 'Agregue al menos un producto a la venta');
            setStatus({
                text: 'Agregue al menos un producto',
                type: 'warning'
            });
            return;
        }
        setStatus({
            text: 'Procesando venta en efectivo...',
            type: 'loading'
        });
        const solicitud = {
            cedula: formulario.cedula,
            nombreCliente: formulario.nombreCliente,
            items,
            numeroCuotas: 0
        };
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].procesarVentaEfectivo(solicitud);
            if (response?.exito) {
                const { subtotal, descuentoEfectivo, totalEfectivo } = calcularTotales();
                const mensaje = `Factura N°: ${response.idFactura}
Cliente: ${formulario.nombreCliente}
Cédula: ${formulario.cedula}
Subtotal: $${subtotal.toFixed(2)}
Descuento (33%): -$${descuentoEfectivo.toFixed(2)}
TOTAL: $${totalEfectivo.toFixed(2)}`;
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showSuccess('Venta Procesada ✅', mensaje);
                setResultado(`✅ VENTA PROCESADA - EFECTIVO
Factura N°: ${response.idFactura}
Cliente: ${formulario.nombreCliente}
Cédula: ${formulario.cedula}
---
Subtotal: $${subtotal.toFixed(2)}
Descuento (33%): $${descuentoEfectivo.toFixed(2)}
TOTAL: $${totalEfectivo.toFixed(2)}`);
                setMostrarResultado(true);
                limpiarFormulario();
                setStatus({
                    text: 'Venta procesada exitosamente',
                    type: 'success'
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showError('Error en la Venta ❌', response?.mensaje || 'Error desconocido al procesar la venta');
                setStatus({
                    text: `Error: ${response?.mensaje || 'Error desconocido'}`,
                    type: 'error'
                });
            }
        } catch (error) {
            setStatus({
                text: 'Error de conexión',
                type: 'error'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showError('Error de Conexión ❌', 'No se pudo procesar la venta. Intente de nuevo.');
        }
    };
    const procesarVentaCredito = async ()=>{
        if (!formulario.cedula.trim() || !formulario.nombreCliente.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Datos Incompletos', 'Complete cédula y nombre del cliente');
            setStatus({
                text: 'Complete los datos del cliente',
                type: 'warning'
            });
            return;
        }
        if (items.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Carrito Vacío', 'Agregue al menos un producto a la venta');
            setStatus({
                text: 'Agregue al menos un producto',
                type: 'warning'
            });
            return;
        }
        if (!formulario.clienteValidado) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showWarning('Cliente No Validado ⚠️', 'El cliente debe ser validado antes de procesar crédito. Haga clic en "Validar Cliente".');
            setStatus({
                text: 'Cliente no validado',
                type: 'warning'
            });
            return;
        }
        setStatus({
            text: 'Procesando venta a crédito...',
            type: 'loading'
        });
        const solicitud = {
            cedula: formulario.cedula,
            nombreCliente: formulario.nombreCliente,
            items,
            numeroCuotas
        };
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clienteUnificado"].procesarVentaCredito(solicitud);
            if (response?.exito) {
                const { subtotal } = calcularTotales();
                // Preparar datos para el diálogo
                const resultadoCredito = {
                    idFactura: response.idFactura,
                    idCreditoBanco: response.idCreditoBanco,
                    nombreCliente: formulario.nombreCliente,
                    cedula: formulario.cedula,
                    subtotal,
                    cuotaMensual: response.cuotaMensual,
                    numeroCuotas: response.numeroCuotas
                };
                setCreditResult(resultadoCredito);
                setShowCreditDialog(true); // Mostrar diálogo personalizado
                // Toast de confirmación rápida
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showSuccess('Crédito Aprobado ✅', 'Venta a crédito procesada exitosamente');
                limpiarFormulario();
                setStatus({
                    text: 'Venta a crédito procesada exitosamente',
                    type: 'success'
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showError('Error en el Crédito ❌', response?.mensaje || 'No se pudo procesar el crédito');
                setStatus({
                    text: `Error: ${response?.mensaje || 'Error desconocido'}`,
                    type: 'error'
                });
            }
        } catch (error) {
            setStatus({
                text: 'Error de conexión',
                type: 'error'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2d$notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastContext"].showError('Error de Conexión ❌', 'No se pudo procesar el crédito. Intente de nuevo.');
        }
    };
    const handleViewAmortization = ()=>{
        console.log('handleViewAmortization ejecutado'); // Para debugging
        console.log('creditResult:', creditResult); // Para debugging
        if (creditResult?.idCreditoBanco) {
            console.log('Llamando onShowCreditTable con ID:', creditResult.idCreditoBanco); // Para debugging
            // Llamar directamente al callback del padre
            if (onShowCreditTable) {
                onShowCreditTable(creditResult.idCreditoBanco);
            }
            setShowCreditDialog(false);
        }
    };
    const limpiarFormulario = ()=>{
        setFormulario({
            cedula: '',
            nombreCliente: '',
            clienteValidado: false,
            idCliente: 0
        });
        setItems([]);
        setCantidad(1);
        setSelectedProduct(null);
        setNumeroCuotas(12);
        setMostrarResultado(false);
    };
    const { subtotal, descuentoEfectivo, totalEfectivo } = calcularTotales();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 space-y-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg",
                                style: {
                                    color: 'var(--dark-gray)'
                                },
                                children: "👤 Datos del Cliente"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            formulario.clienteValidado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-3 py-1 rounded text-xs font-bold animate-pulse",
                                style: {
                                    backgroundColor: 'var(--success)',
                                    color: 'white'
                                },
                                children: "✅ Cliente Validado"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        style: {
                                            color: 'var(--dark-gray)'
                                        },
                                        children: "Cédula:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 378,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "Ingrese cédula...",
                                        value: formulario.cedula,
                                        onChange: (e)=>setFormulario({
                                                ...formulario,
                                                cedula: e.target.value
                                            }),
                                        disabled: validando,
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        style: {
                                            color: 'var(--dark-gray)'
                                        },
                                        children: "Nombre:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "Ingrese nombre...",
                                        value: formulario.nombreCliente,
                                        onChange: (e)=>setFormulario({
                                                ...formulario,
                                                nombreCliente: e.target.value
                                            }),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 389,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: validarCliente,
                        disabled: validando,
                        className: "w-full",
                        style: {
                            backgroundColor: formulario.clienteValidado ? 'var(--success)' : 'var(--primary)',
                            color: 'white',
                            opacity: validando ? 0.7 : 1
                        },
                        children: validando ? '⏳ Validando...' : formulario.clienteValidado ? '✅ Cliente Validado' : '✅ Validar Cliente'
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/facturacion-panel.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 space-y-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg",
                                style: {
                                    color: 'var(--dark-gray)'
                                },
                                children: "🛒 Selección de Productos"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: cargarProductos,
                                style: {
                                    backgroundColor: 'var(--info)',
                                    color: 'white'
                                },
                                children: "🔄 Actualizar"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 419,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        style: {
                                            color: 'var(--dark-gray)'
                                        },
                                        children: "Producto:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedProduct?.idElectrodomestico || '',
                                        onChange: (e)=>{
                                            const prod = productos.find((p)=>p.idElectrodomestico === parseInt(e.target.value));
                                            setSelectedProduct(prod || null);
                                        },
                                        className: "w-full border rounded px-3 py-2",
                                        style: {
                                            borderColor: 'var(--medium-gray)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Seleccione un producto --"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, this),
                                            productos.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p.idElectrodomestico,
                                                    children: [
                                                        p.nombre,
                                                        " (",
                                                        p.marca,
                                                        ") - $",
                                                        p.precioVenta.toFixed(2),
                                                        " - Stock: ",
                                                        p.stock
                                                    ]
                                                }, p.idElectrodomestico, true, {
                                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1",
                                        style: {
                                            color: 'var(--dark-gray)'
                                        },
                                        children: "Cantidad:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 449,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "number",
                                        min: "1",
                                        value: cantidad,
                                        onChange: (e)=>setCantidad(Math.max(1, parseInt(e.target.value) || 1)),
                                        className: "w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 450,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 448,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: agregarItem,
                                    className: "w-full",
                                    style: {
                                        backgroundColor: 'var(--success)',
                                        color: 'white'
                                    },
                                    children: "➕ Agregar"
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 459,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            backgroundColor: 'var(--primary)',
                                            color: 'white'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-2 text-left",
                                                children: "Producto"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-2 text-center",
                                                children: "Cantidad"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-2 text-right",
                                                children: "Precio Unit."
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-2 text-right",
                                                children: "Subtotal"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-2 text-center",
                                                children: "Acción"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 479,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: items.map((item, idx)=>{
                                        const prod = productos.find((p)=>p.idElectrodomestico === item.idElectrodomestico);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                backgroundColor: selectedRowIndex === idx ? '#e8f4f8' : 'white',
                                                cursor: 'pointer'
                                            },
                                            onClick: ()=>setSelectedRowIndex(idx),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-2",
                                                    children: [
                                                        prod?.nombre,
                                                        " (",
                                                        prod?.marca,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-2 text-center",
                                                    children: item.cantidad
                                                }, void 0, false, {
                                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-2 text-right",
                                                    children: [
                                                        "$",
                                                        item.precio.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-2 text-right",
                                                    children: [
                                                        "$",
                                                        (item.cantidad * item.precio).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-2 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removerItem(idx),
                                                        className: "px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/components/panels/facturacion-panel.tsx",
                                            lineNumber: 486,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/facturacion-panel.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/facturacion-panel.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 471,
                        columnNumber: 9
                    }, this),
                    items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded text-center text-sm",
                        style: {
                            backgroundColor: '#f0f0f0',
                            color: 'var(--dark-gray)'
                        },
                        children: "No hay productos agregados"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/facturacion-panel.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 space-y-3",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: '#f9f9f9'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-center",
                        style: {
                            color: 'var(--dark-gray)'
                        },
                        children: "💰 Resumen de Totales"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 528,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                style: {
                                    color: 'var(--dark-gray)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Subtotal:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 532,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold",
                                        children: [
                                            "$",
                                            subtotal.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 533,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                style: {
                                    color: 'var(--dark-gray)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Descuento (33% EFECTIVO):"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 537,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold",
                                        style: {
                                            color: 'var(--success)'
                                        },
                                        children: [
                                            "-$",
                                            descuentoEfectivo.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 538,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 536,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t pt-2 flex justify-between",
                                style: {
                                    borderColor: 'var(--medium-gray)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--success)',
                                            fontSize: '1.1em',
                                            fontWeight: 'bold'
                                        },
                                        children: "TOTAL EFECTIVO:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 542,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--success)',
                                            fontSize: '1.1em',
                                            fontWeight: 'bold'
                                        },
                                        children: [
                                            "$",
                                            totalEfectivo.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 543,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t pt-2 flex justify-between",
                                style: {
                                    borderColor: 'var(--medium-gray)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--warning)',
                                            fontSize: '1.1em',
                                            fontWeight: 'bold'
                                        },
                                        children: "TOTAL CRÉDITO (sin desc.):"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'var(--warning)',
                                            fontSize: '1.1em',
                                            fontWeight: 'bold'
                                        },
                                        children: [
                                            "$",
                                            subtotal.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/facturacion-panel.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 space-y-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg",
                        style: {
                            color: 'var(--dark-gray)'
                        },
                        children: "💳 Facturación"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: procesarVentaEfectivo,
                                disabled: items.length === 0,
                                className: "w-full py-6 font-bold",
                                style: {
                                    backgroundColor: 'var(--success)',
                                    color: 'white',
                                    opacity: items.length === 0 ? 0.5 : 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg",
                                        children: "💵 Venta Efectivo"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 571,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs mt-1",
                                        children: [
                                            "Desc. 33% = $",
                                            totalEfectivo.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 572,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium",
                                        style: {
                                            color: 'var(--dark-gray)'
                                        },
                                        children: "Cuotas:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: numeroCuotas,
                                        onChange: (e)=>setNumeroCuotas(parseInt(e.target.value)),
                                        className: "flex-1 border rounded px-2 py-2",
                                        style: {
                                            borderColor: 'var(--medium-gray)'
                                        },
                                        children: [
                                            3,
                                            6,
                                            12,
                                            18,
                                            24
                                        ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: n,
                                                children: [
                                                    n,
                                                    " meses @ $",
                                                    (subtotal / n).toFixed(2)
                                                ]
                                            }, n, true, {
                                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                                lineNumber: 584,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 577,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: procesarVentaCredito,
                                disabled: items.length === 0,
                                className: "w-full py-6 font-bold",
                                style: {
                                    backgroundColor: items.length === 0 ? '#ccc' : formulario.clienteValidado ? 'var(--warning)' : '#ff6b6b',
                                    color: 'white'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg",
                                        children: "💳 Venta Crédito"
                                    }, void 0, false, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 598,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs mt-1",
                                        children: [
                                            "$",
                                            (subtotal / numeroCuotas).toFixed(2),
                                            "/mes ",
                                            !formulario.clienteValidado && '⚠️'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                                        lineNumber: 599,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/facturacion-panel.tsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    !formulario.clienteValidado && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded text-center text-xs border",
                        style: {
                            backgroundColor: '#fff3e0',
                            borderColor: 'var(--warning)',
                            color: 'var(--warning)'
                        },
                        children: "⚠️ Cliente debe ser validado para procesar crédito"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 604,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/facturacion-panel.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this),
            mostrarResultado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 space-y-3",
                style: {
                    borderColor: 'var(--success)',
                    backgroundColor: '#e8f5e9'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-bold",
                        style: {
                            color: 'var(--success)'
                        },
                        children: "📋 Resultado de la Venta"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 619,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded font-mono text-xs overflow-auto max-h-48 whitespace-pre",
                        style: {
                            backgroundColor: '#1a1a1a',
                            color: '#00ff00'
                        },
                        children: resultado
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 620,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setMostrarResultado(false),
                        className: "w-full",
                        style: {
                            backgroundColor: 'var(--primary)',
                            color: 'white'
                        },
                        children: "Cerrar"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/facturacion-panel.tsx",
                        lineNumber: 626,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/facturacion-panel.tsx",
                lineNumber: 615,
                columnNumber: 9
            }, this),
            creditResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$credit$2d$result$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreditResultDialog"], {
                isOpen: showCreditDialog,
                onClose: ()=>setShowCreditDialog(false),
                resultado: creditResult,
                onViewAmortization: handleViewAmortization
            }, void 0, false, {
                fileName: "[project]/components/panels/facturacion-panel.tsx",
                lineNumber: 637,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/panels/facturacion-panel.tsx",
        lineNumber: 361,
        columnNumber: 5
    }, this);
}
_s(FacturacionPanel, "e9CeU6Sjl+1ZDGQY7LGP9QsSTJg=");
_c = FacturacionPanel;
var _c;
__turbopack_context__.k.register(_c, "FacturacionPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-panel-navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPanelContext",
    ()=>getPanelContext,
    "usePanelNavigation",
    ()=>usePanelNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
let globalPanelContext = {
    pendingCreditId: null,
    navigateToCredit: ()=>{},
    clearPendingCredit: ()=>{}
};
const usePanelNavigation = ()=>{
    _s();
    const [pendingCreditId, setPendingCreditId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const navigateToCredit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanelNavigation.useCallback[navigateToCredit]": (creditId)=>{
            setPendingCreditId(creditId);
            globalPanelContext.pendingCreditId = creditId;
        }
    }["usePanelNavigation.useCallback[navigateToCredit]"], []);
    const clearPendingCredit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanelNavigation.useCallback[clearPendingCredit]": ()=>{
            setPendingCreditId(null);
            globalPanelContext.pendingCreditId = null;
        }
    }["usePanelNavigation.useCallback[clearPendingCredit]"], []);
    globalPanelContext.navigateToCredit = navigateToCredit;
    globalPanelContext.clearPendingCredit = clearPendingCredit;
    return {
        pendingCreditId,
        navigateToCredit,
        clearPendingCredit
    };
};
_s(usePanelNavigation, "OVTMPyIwLpdc/PHZ1/bRAIokQ4k=");
const getPanelContext = ()=>globalPanelContext;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/panels/credito-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreditoPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$panel$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-panel-navigation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function CreditoPanel({ setStatus, creditoIdToLoad, onCreditoLoaded }) {
    _s();
    const [cedulaValidacion, setCedulaValidacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [cedulaAmortizacion, setCedulaAmortizacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [resultadoValidacion, setResultadoValidacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tablaAmortizacion, setTablaAmortizacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [infoCredito, setInfoCredito] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const panelContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$panel$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPanelContext"])();
    const cargarTablaAutomaticamente = async (idCredito)=>{
        setCedulaAmortizacion(String(idCredito));
        setStatus({
            text: 'Cargando tabla de amortización automáticamente...',
            type: 'loading'
        });
        try {
            await new Promise((resolve)=>setTimeout(resolve, 500));
            const cuotas = Array.from({
                length: 12
            }, (_, i)=>({
                    numero: i + 1,
                    valor: 125.50,
                    interes: 15.50,
                    capital: 110.00,
                    saldo: 1500 - 110 * (i + 1),
                    vencimiento: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')
                }));
            setTablaAmortizacion(cuotas);
            setInfoCredito(`Crédito #${idCredito} - Monto: $1,500.00 - Tasa: 12.5% - Cuotas: 12`);
            setStatus({
                text: `Tabla de amortización cargada para crédito #${idCredito}`,
                type: 'success'
            });
            // Notificar que se terminó de cargar
            if (onCreditoLoaded) {
                onCreditoLoaded();
            }
        } catch (error) {
            setStatus({
                text: 'Error al cargar tabla automáticamente',
                type: 'error'
            });
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreditoPanel.useEffect": ()=>{
            if (creditoIdToLoad) {
                console.log('Cargando automáticamente crédito ID:', creditoIdToLoad);
                cargarTablaAutomaticamente(creditoIdToLoad);
            }
        }
    }["CreditoPanel.useEffect"], [
        creditoIdToLoad
    ]);
    const validarSujetoCredito = async ()=>{
        console.log('Cédula ingresada:', cedulaValidacion);
        if (!cedulaValidacion.trim()) {
            setStatus({
                text: 'Ingrese la cédula a consultar',
                type: 'warning'
            });
            return;
        }
        setStatus({
            text: 'Validando sujeto de crédito...',
            type: 'loading'
        });
        try {
            await new Promise((resolve)=>setTimeout(resolve, 800));
            const sujetoCredito = Math.random() > 0.3;
            setResultadoValidacion(`
RESULTADO DE VALIDACIÓN
Cédula: ${cedulaValidacion}
Estado: ${sujetoCredito ? '✅ APROBADO' : '❌ RECHAZADO'}
Mensaje: ${sujetoCredito ? 'Cliente aprobado para crédito' : 'Cliente no cumple requisitos'}
      `.trim());
            setStatus({
                text: sujetoCredito ? 'Cliente aprobado' : 'Cliente no aprobado',
                type: sujetoCredito ? 'success' : 'warning'
            });
        } catch (error) {
            setStatus({
                text: 'Error al validar cliente',
                type: 'error'
            });
        }
    };
    const consultarMontoMaximo = async ()=>{
        if (!cedulaValidacion.trim()) {
            setStatus({
                text: 'Ingrese la cédula a consultar',
                type: 'warning'
            });
            return;
        }
        setStatus({
            text: 'Consultando monto máximo...',
            type: 'loading'
        });
        try {
            await new Promise((resolve)=>setTimeout(resolve, 800));
            const montoMaximo = Math.random() * 10000 + 1000;
            setResultadoValidacion(`
CONSULTA DE MONTO MÁXIMO
Cédula: ${cedulaValidacion}
Estado: ✅ APROBADO
Monto máximo: $${montoMaximo.toFixed(2)}
Mensaje: Monto máximo calculado correctamente
      `.trim());
            setStatus({
                text: 'Consulta de monto máximo completada',
                type: 'success'
            });
        } catch (error) {
            setStatus({
                text: 'Error al consultar monto',
                type: 'error'
            });
        }
    };
    const verTablaAmortizacion = async ()=>{
        if (!cedulaAmortizacion.trim()) {
            setStatus({
                text: 'Ingrese el ID del crédito',
                type: 'warning'
            });
            return;
        }
        setStatus({
            text: 'Obteniendo tabla de amortización...',
            type: 'loading'
        });
        try {
            await new Promise((resolve)=>setTimeout(resolve, 800));
            const cuotas = Array.from({
                length: 12
            }, (_, i)=>({
                    numero: i + 1,
                    valor: 125.50,
                    interes: 15.50,
                    capital: 110.00,
                    saldo: 1500 - 110 * (i + 1),
                    vencimiento: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')
                }));
            setTablaAmortizacion(cuotas);
            setInfoCredito(`Crédito #${cedulaAmortizacion} - Monto: $1,500.00 - Tasa: 12.5% - Cuotas: 12`);
            setStatus({
                text: 'Tabla de amortización cargada',
                type: 'success'
            });
        } catch (error) {
            setStatus({
                text: 'Error al obtener tabla',
                type: 'error'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg mb-4",
                        children: "🔍 Validación de Crédito"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 mb-4 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Ingrese cédula...",
                                value: cedulaValidacion,
                                onChange: (e)=>setCedulaValidacion(e.target.value),
                                className: "flex-1 min-w-48"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/credito-panel.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: validarSujetoCredito,
                                style: {
                                    backgroundColor: 'var(--primary)',
                                    color: 'white'
                                },
                                children: "✅ Validar"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/credito-panel.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: consultarMontoMaximo,
                                style: {
                                    backgroundColor: 'var(--success)',
                                    color: 'white'
                                },
                                children: "💰 Monto Máximo"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/credito-panel.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    resultadoValidacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded font-mono text-xs whitespace-pre",
                        style: {
                            backgroundColor: '#1a1a1a',
                            color: 'white'
                        },
                        children: resultadoValidacion
                    }, void 0, false, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/credito-panel.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg mb-4",
                        children: "📊 Tabla de Amortización"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 mb-4 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Ingrese ID del crédito...",
                                value: cedulaAmortizacion,
                                onChange: (e)=>setCedulaAmortizacion(e.target.value),
                                className: "max-w-xs"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/credito-panel.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: verTablaAmortizacion,
                                style: {
                                    backgroundColor: 'var(--success)',
                                    color: 'white'
                                },
                                children: "📊 Ver Tabla"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/credito-panel.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    infoCredito && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium mb-3",
                        style: {
                            color: 'var(--dark-gray)'
                        },
                        children: infoCredito
                    }, void 0, false, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    tablaAmortizacion.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto border rounded",
                        style: {
                            borderColor: 'var(--medium-gray)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    style: {
                                        backgroundColor: 'var(--primary)',
                                        color: 'white'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-left font-semibold",
                                                children: "#"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/credito-panel.tsx",
                                                lineNumber: 204,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-right font-semibold",
                                                children: "Valor Cuota"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/credito-panel.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-right font-semibold",
                                                children: "Interés"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/credito-panel.tsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-right font-semibold",
                                                children: "Capital"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/credito-panel.tsx",
                                                lineNumber: 207,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-right font-semibold",
                                                children: "Saldo"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/credito-panel.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2 text-center font-semibold",
                                                children: "Vencimiento"
                                            }, void 0, false, {
                                                fileName: "[project]/components/panels/credito-panel.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/panels/credito-panel.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: tablaAmortizacion.map((cuota, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                borderBottom: '1px solid var(--light-gray)',
                                                backgroundColor: idx % 2 === 0 ? 'white' : 'var(--light-gray)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2",
                                                    children: cuota.numero
                                                }, void 0, false, {
                                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-right font-medium",
                                                    children: [
                                                        "$",
                                                        cuota.valor.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-right",
                                                    children: [
                                                        "$",
                                                        cuota.interes.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-right",
                                                    children: [
                                                        "$",
                                                        cuota.capital.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-right font-medium",
                                                    children: [
                                                        "$",
                                                        cuota.saldo.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-center",
                                                    children: cuota.vencimiento
                                                }, void 0, false, {
                                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, cuota.numero, true, {
                                            fileName: "[project]/components/panels/credito-panel.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/panels/credito-panel.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/panels/credito-panel.tsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/panels/credito-panel.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/credito-panel.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/panels/credito-panel.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_s(CreditoPanel, "MVdzgYg0HF/BIjwbkCC92U/sIeM=");
_c = CreditoPanel;
var _c;
__turbopack_context__.k.register(_c, "CreditoPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/panels/conectividad-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConectividadPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ConectividadPanel({ protocol, setProtocol, setStatus, setConnectionStatus }) {
    _s();
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'Sistema iniciado - Protocolo: REST'
    ]);
    const [testing, setTesting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const agregarLog = (mensaje)=>{
        const timestamp = new Date().toLocaleTimeString('es-ES');
        setLogs((prev)=>[
                ...prev,
                `[${timestamp}] ${mensaje}`
            ]);
    };
    const probarConexiones = async ()=>{
        setTesting(true);
        setStatus({
            text: 'Probando conexiones...',
            type: 'loading'
        });
        agregarLog('Iniciando prueba de conexiones...');
        try {
            await new Promise((resolve)=>setTimeout(resolve, 2000));
            const comercializadoraOk = Math.random() > 0.1;
            const banquitoOk = Math.random() > 0.1;
            if (comercializadoraOk) {
                agregarLog('✅ Comercializadora conectada');
            } else {
                agregarLog('❌ Error conectando Comercializadora');
            }
            if (banquitoOk) {
                agregarLog('✅ BanQuito conectado');
            } else {
                agregarLog('❌ Error conectando BanQuito');
            }
            const todasConectadas = comercializadoraOk && banquitoOk;
            setConnectionStatus({
                connected: todasConectadas,
                details: todasConectadas ? 'Todos los servicios activos' : 'Algunos servicios no disponibles'
            });
            if (todasConectadas) {
                setStatus({
                    text: 'Todas las conexiones están activas',
                    type: 'success'
                });
                agregarLog('✅ Todas las conexiones funcionando correctamente');
            } else {
                setStatus({
                    text: 'Algunos servicios no están disponibles',
                    type: 'warning'
                });
                agregarLog('⚠️ Algunos servicios no están disponibles');
            }
        } catch (error) {
            setStatus({
                text: 'Error al probar conexiones',
                type: 'error'
            });
            agregarLog('❌ Error al probar conexiones');
        } finally{
            setTesting(false);
        }
    };
    const cambiarProtocolo = (nuevoProtocolo)=>{
        setProtocol(nuevoProtocolo);
        agregarLog(`Protocolo cambiado a: ${nuevoProtocolo}`);
        setStatus({
            text: `Protocolo cambiado a: ${nuevoProtocolo}`,
            type: 'success'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded p-4",
                        style: {
                            borderColor: 'var(--medium-gray)',
                            backgroundColor: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium mb-1",
                                style: {
                                    color: 'var(--medium-gray)'
                                },
                                children: "🔧 PROTOCOLO ACTUAL"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-bold",
                                style: {
                                    color: 'var(--primary)'
                                },
                                children: [
                                    "Protocolo: ",
                                    protocol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded p-4",
                        style: {
                            borderColor: 'var(--medium-gray)',
                            backgroundColor: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium mb-1",
                                style: {
                                    color: 'var(--medium-gray)'
                                },
                                children: "🏪 COMERCIALIZADORA"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg",
                                children: "🟢 Conectado"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded p-4",
                        style: {
                            borderColor: 'var(--medium-gray)',
                            backgroundColor: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium mb-1",
                                style: {
                                    color: 'var(--medium-gray)'
                                },
                                children: "🏦 BANQUITO CORE"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg",
                                children: "🟢 Conectado"
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/conectividad-panel.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg mb-4",
                        children: "⚙️ Configuración de Protocolos"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>cambiarProtocolo('REST'),
                                className: "px-4 py-2 rounded font-medium text-white",
                                style: {
                                    backgroundColor: protocol === 'REST' ? 'var(--success)' : 'var(--medium-gray)'
                                },
                                children: protocol === 'REST' ? '✅ REST Activo' : 'REST (Java)'
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>cambiarProtocolo('SOAP'),
                                className: "px-4 py-2 rounded font-medium text-white",
                                style: {
                                    backgroundColor: protocol === 'SOAP' ? 'var(--success)' : 'var(--medium-gray)'
                                },
                                children: protocol === 'SOAP' ? '✅ SOAP Activo' : 'SOAP (.NET)'
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: probarConexiones,
                                disabled: testing,
                                className: "px-4 py-2 rounded font-medium text-white",
                                style: {
                                    backgroundColor: 'var(--primary)'
                                },
                                children: testing ? '⏳ Probando...' : '🔄 Probar Conexiones'
                            }, void 0, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/conectividad-panel.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4",
                style: {
                    borderColor: 'var(--medium-gray)',
                    backgroundColor: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg mb-3",
                        children: "📝 Log de Conexiones"
                    }, void 0, false, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded font-mono text-xs overflow-auto h-48 border",
                        style: {
                            backgroundColor: '#1a1a1a',
                            color: 'white',
                            borderColor: 'var(--dark-gray)'
                        },
                        children: logs.map((log, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: log
                            }, i, false, {
                                fileName: "[project]/components/panels/conectividad-panel.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/panels/conectividad-panel.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/panels/conectividad-panel.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/panels/conectividad-panel.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(ConectividadPanel, "InuzWaaJqcy16zoTAYH9yF9b0qU=");
_c = ConectividadPanel;
var _c;
__turbopack_context__.k.register(_c, "ConectividadPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/status-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$productos$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/panels/productos-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$facturacion$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/panels/facturacion-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$credito$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/panels/credito-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$conectividad$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/panels/conectividad-panel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const [activePanel, setActivePanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('productos');
    const [protocol, setProtocol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('REST');
    const [statusMessage, setStatusMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        text: 'Listo',
        type: 'default'
    });
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        connected: false,
        details: ''
    });
    const [creditoIdToLoad, setCreditoIdToLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleShowCreditTable = (idCredito)=>{
        console.log('Navegando a crédito con ID:', idCredito);
        setCreditoIdToLoad(idCredito);
        setActivePanel('credito');
    };
    const renderPanel = ()=>{
        switch(activePanel){
            case 'productos':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$productos$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    setStatus: setStatusMessage
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 30,
                    columnNumber: 16
                }, this);
            case 'facturacion':
            case 'facturacion':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$facturacion$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    setStatus: setStatusMessage,
                    onShowCreditTable: handleShowCreditTable
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 33,
                    columnNumber: 16
                }, this);
            case 'credito':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$credito$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    setStatus: setStatusMessage,
                    creditoIdToLoad: creditoIdToLoad,
                    onCreditoLoaded: ()=>setCreditoIdToLoad(null)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 38,
                    columnNumber: 16
                }, this);
            case 'conectividad':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$conectividad$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    protocol: protocol,
                    setProtocol: setProtocol,
                    setStatus: setStatusMessage,
                    setConnectionStatus: setConnectionStatus
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 44,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$panels$2f$productos$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    setStatus: setStatusMessage
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 46,
                    columnNumber: 16
                }, this);
        }
    };
    const getPanelTitle = ()=>{
        switch(activePanel){
            case 'productos':
                return 'Gestión de Productos';
            case 'facturacion':
                return 'Sistema de Facturación';
            case 'credito':
                return 'Consultas de Crédito BanQuito';
            case 'conectividad':
                return 'Estado de Conectividad';
            default:
                return 'ESPE Comercializadora';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen",
        style: {
            backgroundColor: 'var(--bg-main)',
            color: 'var(--dark-gray)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        activePanel: activePanel,
                        onPanelChange: setActivePanel
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col overflow-hidden",
                        style: {
                            backgroundColor: 'var(--bg-main)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 border-b",
                                style: {
                                    borderColor: 'var(--medium-gray)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold",
                                    style: {
                                        color: 'var(--dark-gray)'
                                    },
                                    children: getPanelTitle()
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-auto p-5",
                                children: renderPanel()
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: statusMessage,
                connectionStatus: connectionStatus,
                protocol: protocol
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(Home, "N1egSgnvVSQflSG+m4nnsqIyd7g=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b718bec6._.js.map