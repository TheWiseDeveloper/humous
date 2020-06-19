import { useState, useEffect } from 'react'
import { siteTitle } from '../data/info'
import Link from 'next/link'
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './layout.module.css'
import { annotate } from 'rough-notation';
import utilStyles from '../styles/utils.module.css'
import MenuItem from '../data/pages/allPages.json'


export default function Layout({ children, home }) {
    const [collapsed, setCollapsed] = useState(true)

    const toggleNavMenu = () => setCollapsed(!collapsed)

    useEffect(() => {
        const e = document.getElementById('appHeader');
        const annotation = annotate(e, { type: 'highlight', color: '#fff176' });
        annotation.show();
    })

    return(
        <>
            <header className={styles.container}>
                {home? (
                    <>
                        <Navbar color="faded" light>
                            <NavbarBrand id="appHeader" className={`${styles.frontPageHeader}`}>
                                {siteTitle}
                            </NavbarBrand>
                            <NavbarToggler onClick={toggleNavMenu}/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    {MenuItem.map(({ page, title }) => (
                                        <NavItem key={page}>
                                            <Link href="/[page]" as={page}>
                                                <a className={utilStyles.noundURI}>
                                                    <NavLink>{title}</NavLink>
                                                </a>
                                            </Link>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                ) : (
                    <>
                        <Navbar color="faded" light>
                            <Link href="/" passHref>
                                <NavbarBrand id="appHeader">
                                    {siteTitle}
                                </NavbarBrand>
                            </Link>
                            <NavbarToggler onClick={toggleNavMenu}/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    {MenuItem.map(({ page, title }) => (
                                        <NavItem key={page}>
                                            <Link href="/[page]" as={page}>
                                                <a className={utilStyles.noundURI}>
                                                    <NavLink>{title}</NavLink>
                                                </a>
                                            </Link>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                )}
            </header>
            <main> {children} </main>
            <footer className={`${styles.container} ${styles.footer}`}>
                {home? (
                    <div className={utilStyles.spaceBetweenFlex}>
                    <NavbarBrand>
                        <h6 className={`${styles.frontPageHeader}`}>
                            &copy; 2020 &nbsp;{siteTitle}
                        </h6>
                    </NavbarBrand>
                    <h6>All rights reserved.</h6>
                </div>
                ) : (
                    <div className={utilStyles.spaceBetweenFlex}>
                    <NavbarBrand>
                        <h6 className={`${styles.frontPageHeader}`}>
                            &copy; 2020 &nbsp;
                            <Link href="/" passHref>
                                <a>{siteTitle}</a>
                            </Link>
                        </h6>
                    </NavbarBrand>
                    <h6>All rights reserved.</h6>
                </div>
                )}
            </footer>
        </>
    )
}