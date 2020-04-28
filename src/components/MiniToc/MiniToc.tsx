import React, {ReactElement} from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn-lite';

import {HeadingItem} from '../../models';
import {Scrollspy} from '../Scrollspy';

import './MiniToc.scss';

const b = block('dc-mini-toc');

export interface MinitocProps {
    headings: HeadingItem[];
}

export class MiniToc extends React.Component<MinitocProps> {
    static propTypes = {
        headings: PropTypes.array.isRequired,
    };

    render() {
        return (
            <div className={b()}>
                {this.renderSections()}
            </div>
        );
    }

    private renderSections() {
        const {headings} = this.props;

        if (headings.length === 0) {
            return null;
        }

        const sectionHrefs = headings.reduce<string[]>((prevHrefs, {href, items}) => {
            const children = items ? items.map(({href: itemHref}) => itemHref) : [];

            return prevHrefs.concat(href, children);
        }, []);

        if (sectionHrefs.length === 0) {
            return null;
        }

        return (
            <Scrollspy
                className={b('sections')}
                currentClassName={b('section', {active: true})}
                items={sectionHrefs}
            >
                {headings.reduce(this.renderSection, [])}
            </Scrollspy>
        );
    }

    private renderSection = (prevSections: ReactElement[], heading: HeadingItem) => {
        return prevSections.concat(
            this.renderItem(heading),
            heading.items
                ? heading.items.map((item) => this.renderItem(item, true))
                : [],
        );
    };

    private renderItem = ({title, href}: HeadingItem, isChild = false) => {
        return (
            <li
                key={href}
                data-hash={href}
                className={b('section', {child: isChild})}
            >
                <a href={href} className={b('section-link')} data-router-shallow>{title}</a>
            </li>
        );
    };
}
