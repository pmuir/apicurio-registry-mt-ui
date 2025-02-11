/**
 * @license
 * Copyright 2021 Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import "./errorPage.css";
import {
    Button,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateSecondaryActions,
    EmptyStateVariant,
    PageSection,
    PageSectionVariants,
    Title
} from '@patternfly/react-core';
import {PureComponent, PureComponentProps, PureComponentState} from "../baseComponent";
import {PageErrorType} from "../../pages/basePage";
import {ExclamationTriangleIcon} from "@patternfly/react-icons";


export interface PageError {
    type: PageErrorType,
    errorMessage: string,
    error: any
}


// tslint:disable-next-line:no-empty-interface
export interface ErrorPageProps extends PureComponentProps {
    error: PageError|undefined;
}

// tslint:disable-next-line:no-empty-interface
export interface ErrorPageState extends PureComponentState {
    isShowDetails: boolean;
    editorWidth: string;
    editorHeight: string;
}


export class ErrorPage extends PureComponent<ErrorPageProps, ErrorPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<ErrorPageProps>) {
        super(props);
    }

    public render(): React.ReactElement {
        return (
            <React.Fragment>
                <PageSection className="ps_error" variant={PageSectionVariants.light}>
                    <div className="centerizer">
                        <EmptyState variant={EmptyStateVariant.large}>
                            <EmptyStateIcon icon={ExclamationTriangleIcon} />
                            <Title headingLevel="h5" size="lg">{ this.errorMessage() }</Title>
                            <EmptyStateBody>
                                Something went seriously wrong on the server.  We'll try to provide you with some more information about
                                the problem (see below) but you might want to try reloading.  If things still don't work then you'll
                                have to report the problem to an admin.
                            </EmptyStateBody>
                            <Button variant="primary" onClick={this.reloadPage}>Reload page</Button>
                            <EmptyStateSecondaryActions>
                                <Button variant="link"
                                        data-testid="error-btn-artifacts"
                                        onClick={this.navigateTo("/")}>Back to artifacts</Button>
                                <Button variant="link"
                                        data-testid="error-btn-details"
                                        onClick={this.showDetails}>Show details</Button>
                            </EmptyStateSecondaryActions>
                        </EmptyState>
                    </div>
                </PageSection>
            </React.Fragment>
        );
    }

    protected initializeState(): ErrorPageState {
        return {
            editorHeight: "250px",
            editorWidth: "100%",
            isShowDetails: false
        };
    }

    private errorMessage(): string {
        if (this.props.error) {
            return this.props.error.errorMessage;
        } else {
            return "Internal server error";
        }
    }

    private errorDetail(): string {
        if (this.props.error && this.props.error.error && this.props.error.error.detail) {
            return this.props.error.error.detail;
        } else if (this.props.error && this.props.error.error) {
            return JSON.stringify(this.props.error.error, null, 3);
        } else {
            return "Error info not available";
        }
    }

    private showDetails = (): void => {
        this.setSingleState("isShowDetails", true);
    };

    private reloadPage = (): void => {
        window.location.reload();
    }
}
