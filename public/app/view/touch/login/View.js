/**
 * The basic login view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.login.View", {
	extend: "Skin.view.touch.login.base.View",
    alias: "widget.loginView",
    controller: "Skin.mediator.touch.login.Mediator",

    config: {
        title: "Login",
        plugins: [
            {
                type: "localization",
                method: "setTitle",
                key: "login.title"
            }
        ],
        items: [
//            {
//                xtype: "image",
//                src: Ext.Viewport.getOrientation() == "portrait" ? "../../../img/login.png" : "../../../img/login-small.png",
//                style: Ext.Viewport.getOrientation() == "portrait" ? "width:80px;height:80px;margin:auto" : "width:40px;height:40px;margin:auto"
//            },
            {
                xtype: "fieldset",
                itemId: "company",
                title: "Your Company",
				height: 187, // make this flexible
                items: [
                    {
                        xtype: "textfield",
                        itemId: "usernameTextField",
                        name: "usernameTextField",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "login.username"
                            }
                        ]
                    },
                    {
                        xtype: "passwordfield",
                        itemId: "passwordTextField",
                        name: "passwordTextField",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "login.password"
                            }
                        ]
                    },
                    {
                        xtype: "checkboxfield",
                        itemId: "keepmeloggedinCheckboxField",
                        name: "keepmeloggedinCheckboxField",
                        required: false,
                        checked: false,
                        plugins: [
                            {
                                type: "localization",
                                method: "setLabel",
                                key: "login.keepmeloggedin"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "label",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "login.passwordHint"
                    }
                ]
            },
            {
                xtype: "button",
                itemId: "logInButton",
                ui: "neutral", // WAS "action",
                padding: "10px",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "login.submit"
                    }
                ]
            },
            {
                xtype: "label",
                itemId: "logInFailedLabel",
                name: "logInFailedLabel",
                hidden: true,
                hideAnimation: "fadeOut",
                showAnimation: "fadeIn",
                style: "color:#990000;margin:5px 0px;",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "login.loginFailed"
                    }
                ]
            }
        ]
    }
});


