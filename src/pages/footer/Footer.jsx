import React, { useState } from "react";
import s from "./Footer.module.css";
import {
   FooterQuickLinks,
   FooterLegalLinks,
   FooterStatsLinks,
   FooterCategories,
} from "../../utils/constants/Constants";
import CustomModal from "../../components/CustomModal/CustomModal";
import { Link } from "react-router-dom";

const Footer = () => {
   const [privacyModal, setPrivacyModal] = useState(false);
   const [termsModal, setTermsModal] = useState(false);
   const [aboutModal, setAboutModal] = useState(false);
   const [supportModal, setSupportModal] = useState(false);
   return (
      <div className={s.container}>
         <div className={s.top_container}>
            {/* ══ COL 1 — BRAND ══ */}
            <div className={s.footer_row1}>
               <Link to="/" className={s.logo}>
                  <div className={s.logo_icon}>
                     <span className={s.logo_pulse}></span>
                  </div>

                  <span className={s.logo_text}>
                     SKIN<span className={s.logo_accent}>VAULT</span>
                  </span>
               </Link>
               <p className={s.tagline}>
                  Buy and sell CS2 skins instantly. No middleman, no hidden fees
                  — just live market prices.
               </p>
               <div className={s.socials}>
                  <a
                     href="https://store.steampowered.com/"
                     className={s.social_link}
                  >
                     Steam
                  </a>
                  <a href="https://discord.com/" className={s.social_link}>
                     Discord
                  </a>
                  <a href="https://x.com/" className={s.social_link}>
                     Twitter
                  </a>
               </div>
            </div>

            {/* ══ COL 2 — QUICK LINKS ══ */}
            <div className={s.footer_row2}>
               <h4 className={s.col_title}>Quick Links</h4>

               <ul className={s.link_list}>
                  {FooterQuickLinks.map((link) => (
                     <li key={link.key}>
                        {link.label === "Support" ? (
                           <button
                              type="button"
                              onClick={() => setSupportModal(true)}
                              className={s.footer_button}
                           >
                              {link.label}
                           </button>
                        ) : (
                           <Link to={link.href}>{link.label}</Link>
                        )}
                     </li>
                  ))}
               </ul>
            </div>

            {/* ══ COL 3 — CATEGORIES ══ */}
            <div className={s.footer_row3}>
               <h4 className={s.col_title}>Categories</h4>

               <ul className={s.link_list}>
                  {FooterCategories.map((cat) => (
                     <li key={cat.href}>
                        <Link to={`/store${cat.href}`}>{cat.value}</Link>
                     </li>
                  ))}
               </ul>
            </div>

            {/* ══ COL 4 — LEGAL ══ */}
            <div className={s.footer_row4}>
               <h4 className={s.col_title}>Legal</h4>

               <ul className={s.link_list}>
                  {FooterLegalLinks.map((link) => (
                     <li key={link.href}>
                        {link.label === "Terms of Service" ? (
                           <button
                              type="button"
                              className={s.footer_button}
                              onClick={() => setTermsModal(true)}
                           >
                              {link.label}
                           </button>
                        ) : link.label === "Privacy Policy" ? (
                           <button
                              type="button"
                              className={s.footer_button}
                              onClick={() => setPrivacyModal(true)}
                           >
                              {link.label}
                           </button>
                        ) : link.label === "About Us" ? (
                           <button
                              type="button"
                              className={s.footer_button}
                              onClick={() => {
                                 setAboutModal(true);
                              }}
                           >
                              {link.label}
                           </button>
                        ) : (
                           <Link to={link.href}>{link.label}</Link>
                        )}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         <CustomModal
            isOpen={supportModal}
            onClose={() => setSupportModal(false)}
            title="Support"
            subTitle="We're here to help"
         >
            <div className={s.support_content}>
               <div className={s.support_intro}>
                  <h3>How can we help?</h3>
                  <p>
                     Our support team is here to help with your SkinVault
                     account, purchases, sales, and other marketplace-related
                     questions. Whether you need help with your profile, Steam
                     account, payment, or an order, we're happy to assist.
                  </p>
               </div>

               <div className={s.support_email}>
                  <span className={s.support_label}>Support Email</span>
                  <a
                     href="mailto:support@skinvault.com"
                     className={s.support_email_link}
                  >
                     support@skinvault.com
                  </a>
               </div>

               <div className={s.support_contact}>
                  <h3>Account & Payments</h3>
                  <p>
                     For account-related requests, we may need to verify details
                     such as your first name, last name, email address, Steam
                     information, or order details. For payment-related issues,
                     our team can also assist with card and PayPal transactions.
                  </p>
               </div>

               <p className={s.support_response}>
                  For faster assistance, please include your order ID and a
                  brief description of the issue you're experiencing.
               </p>

               <a
                  href="mailto:support@skinvault.com"
                  className={s.support_button}
               >
                  Contact Support
               </a>
            </div>
         </CustomModal>
         <CustomModal
            isOpen={privacyModal}
            onClose={() => setPrivacyModal(false)}
            title="Privacy Policy"
            subTitle="How SkinVault handles your information"
         >
            <div className={s.legal_content}>
               <section>
                  <h3>1. Information We Collect</h3>
                  <p>
                     When you use SkinVault, we may collect information such as
                     your account details, transaction information, and
                     information required to provide our marketplace services.
                  </p>
               </section>

               <section>
                  <h3>2. How We Use Your Information</h3>
                  <p>
                     We use collected information to operate and improve
                     SkinVault, process transactions, maintain your account,
                     provide customer support, prevent fraud, and maintain the
                     security of our platform.
                  </p>
               </section>

               <section>
                  <h3>3. Payment Information</h3>
                  <p>
                     Payment information may be processed through third-party
                     payment providers. SkinVault does not intentionally store
                     sensitive payment credentials such as your full card number
                     or security code unless explicitly required by a payment
                     provider.
                  </p>
               </section>

               <section>
                  <h3>4. Cookies & Local Storage</h3>
                  <p>
                     SkinVault may use cookies, local storage, and similar
                     technologies to remember preferences, maintain sessions,
                     manage your cart, and improve the overall experience of the
                     website.
                  </p>
               </section>

               <section>
                  <h3>5. Third-Party Services</h3>
                  <p>
                     SkinVault may integrate with third-party services such as
                     Steam, payment providers, analytics services, or other
                     platforms. These services may have their own privacy
                     policies and terms.
                  </p>
               </section>

               <section>
                  <h3>6. Data Security</h3>
                  <p>
                     We take reasonable measures to protect information
                     associated with your SkinVault account. However, no
                     internet-based service can guarantee complete security of
                     information.
                  </p>
               </section>

               <section>
                  <h3>7. Your Choices</h3>
                  <p>
                     You may contact us regarding your personal information,
                     account details, or questions about how your information is
                     handled.
                  </p>
               </section>

               <section>
                  <h3>8. Changes to This Policy</h3>
                  <p>
                     We may update this Privacy Policy from time to time. Any
                     changes will be reflected in this policy with an updated
                     revision date.
                  </p>
               </section>

               <section>
                  <h3>9. Contact Us</h3>
                  <p>
                     If you have questions about this Privacy Policy or how
                     SkinVault handles information, please contact the SkinVault
                     support team.
                  </p>
               </section>

               <div className={s.policy_updated}>
                  Last updated: October 2026
               </div>
            </div>
         </CustomModal>
         <CustomModal
            isOpen={termsModal}
            onClose={() => setTermsModal(false)}
            title="Terms of Service"
            subTitle="The terms and conditions governing your use of SkinVault"
         >
            <div className={s.legal_content}>
               <section>
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                     By creating an account, accessing, or using SkinVault, you
                     agree to be bound by these Terms of Service and any
                     applicable policies referenced on the platform. If you do
                     not agree with these terms, please do not use SkinVault.
                  </p>
               </section>

               <section>
                  <h3>2. About SkinVault</h3>
                  <p>
                     SkinVault is an online marketplace operated by BEMI PRIME
                     LTD, registered at 128 City Road, London, EC1V 2NX. The
                     platform provides users with access to supported
                     Counter-Strike 2 skins and related digital items for
                     purchase and sale.
                  </p>
                  <p>
                     SkinVault is an independent platform and is not affiliated
                     with, endorsed by, or sponsored by Valve Corporation or
                     Steam.
                  </p>
               </section>

               <section>
                  <h3>3. Eligibility</h3>
                  <p>
                     You must meet the minimum age and legal requirements
                     applicable in your country or region to use SkinVault. By
                     using the platform, you confirm that you are legally
                     permitted to enter into transactions involving the services
                     and digital items offered through SkinVault.
                  </p>
               </section>

               <section>
                  <h3>4. User Accounts</h3>
                  <p>
                     You are responsible for providing accurate and current
                     information when creating and maintaining your SkinVault
                     account. This may include information such as your name,
                     email address, and Steam account details where required for
                     the use of marketplace services.
                  </p>
                  <p>
                     You are responsible for maintaining the security of your
                     account and for activity carried out through it. You must
                     not share your credentials or use another person's account
                     without authorization.
                  </p>
               </section>

               <section>
                  <h3>5. Buying and Selling Skins</h3>
                  <p>
                     SkinVault allows eligible users to purchase and, where
                     supported, sell Counter-Strike 2 skins and other supported
                     digital items. Product availability, pricing, and
                     transaction status may change based on marketplace
                     conditions and item availability.
                  </p>
                  <p>
                     A transaction is considered complete only after the
                     applicable payment and verification processes have been
                     successfully completed. SkinVault may decline, cancel, or
                     delay a transaction where reasonably necessary to prevent
                     fraud, comply with applicable requirements, or protect
                     users and the platform.
                  </p>
               </section>

               <section>
                  <h3>6. Digital Items</h3>
                  <p>
                     CS2 skins and other items available through SkinVault are
                     digital items and do not constitute physical goods.
                     Purchasing a digital item does not provide ownership of
                     Counter-Strike 2, Steam, Valve's software, trademarks, or
                     any underlying intellectual property.
                  </p>
                  <p>
                     Any use or transfer of digital items remains subject to
                     applicable platform rules and the terms governing the
                     relevant third-party services.
                  </p>
               </section>

               <section>
                  <h3>7. Payments</h3>
                  <p>
                     SkinVault may provide payment options including supported
                     card and PayPal payment methods. Payments may be processed
                     through third-party payment providers, and their respective
                     terms and policies may also apply.
                  </p>
                  <p>
                     You agree not to use stolen payment information,
                     unauthorized accounts, fraudulent payment methods, or any
                     other unlawful means to complete a transaction.
                  </p>
               </section>

               <section>
                  <h3>8. Pricing and Availability</h3>
                  <p>
                     Prices and availability of skins may change at any time due
                     to marketplace conditions, inventory, demand, or other
                     factors. Displayed prices may therefore differ from prices
                     available at a later time.
                  </p>
                  <p>
                     SkinVault does not guarantee that a particular item will
                     remain available or that a displayed price will remain
                     unchanged until a transaction has been successfully
                     completed.
                  </p>
               </section>

               <section>
                  <h3>9. Orders, Cancellations and Refunds</h3>
                  <p>
                     Once an order has been successfully completed, cancellation
                     or reversal may not always be possible. Refund requests are
                     reviewed according to the circumstances of the transaction
                     and any applicable payment provider requirements.
                  </p>
                  <p>
                     Where a transaction cannot be completed due to an issue
                     within the SkinVault marketplace, the applicable order or
                     payment process will be reviewed and handled in accordance
                     with our policies.
                  </p>
               </section>

               <section>
                  <h3>10. Delivery of Digital Items</h3>
                  <p>
                     Where applicable, purchased skins may be delivered through
                     supported Steam or other third-party systems. SkinVault
                     aims to provide fast delivery following successful payment
                     and verification.
                  </p>
                  <p>
                     Delivery may be affected by Steam restrictions, trade
                     holds, account limitations, technical issues, or other
                     circumstances outside SkinVault's reasonable control.
                  </p>
               </section>

               <section>
                  <h3>11. Prohibited Activities</h3>
                  <p>
                     Users may not use SkinVault for fraudulent, unlawful,
                     abusive, or unauthorized activities. This includes
                     attempting to manipulate transactions, use stolen payment
                     information, gain unauthorized access to accounts or
                     systems, exploit technical vulnerabilities, interfere with
                     the platform, or engage in money laundering or other
                     unlawful conduct.
                  </p>
               </section>

               <section>
                  <h3>12. Steam and Third-Party Services</h3>
                  <p>
                     SkinVault may rely on Steam and other third-party services
                     to support certain marketplace functions. Your use of those
                     services remains subject to their own terms, policies, and
                     requirements.
                  </p>
                  <p>
                     SkinVault is not responsible for third-party outages, trade
                     restrictions, account limitations, API changes, service
                     interruptions, or other issues outside our reasonable
                     control.
                  </p>
               </section>

               <section>
                  <h3>13. Account Suspension or Termination</h3>
                  <p>
                     SkinVault may restrict, suspend, or terminate an account
                     where there is a reasonable basis to believe that the user
                     has violated these Terms, engaged in fraudulent or unlawful
                     activity, misused the platform, or created a risk to other
                     users or SkinVault.
                  </p>
               </section>

               <section>
                  <h3>14. Platform Availability</h3>
                  <p>
                     We aim to maintain a reliable and accessible marketplace;
                     however, uninterrupted or error-free availability cannot be
                     guaranteed. Maintenance, technical failures, security
                     incidents, third-party outages, or other circumstances may
                     temporarily affect access to SkinVault.
                  </p>
               </section>

               <section>
                  <h3>15. Intellectual Property</h3>
                  <p>
                     SkinVault's name, branding, website design, software, text,
                     graphics, and other original materials are owned by or
                     licensed to SkinVault and are protected by applicable
                     intellectual property laws.
                  </p>
                  <p>
                     You may not copy, reproduce, modify, distribute, or
                     commercially use SkinVault content without appropriate
                     authorization.
                  </p>
               </section>

               <section>
                  <h3>16. Limitation of Liability</h3>
                  <p>
                     To the extent permitted by applicable law, SkinVault and
                     BEMI PRIME LTD are not responsible for losses arising from
                     third-party services, market price changes, service
                     interruptions, account restrictions, unauthorized activity,
                     or circumstances outside our reasonable control.
                  </p>
               </section>

               <section>
                  <h3>17. Changes to These Terms</h3>
                  <p>
                     We may update these Terms of Service from time to time to
                     reflect changes to SkinVault, our services, or applicable
                     requirements. Updated terms will become effective when
                     published on the platform.
                  </p>
                  <p>
                     Your continued use of SkinVault after updated terms are
                     published constitutes acceptance of the revised Terms of
                     Service.
                  </p>
               </section>

               <section>
                  <h3>18. Contact</h3>
                  <p>
                     If you have questions regarding these Terms of Service,
                     transactions, your account, or the SkinVault platform,
                     please contact our support team at support@skinvault.com.
                  </p>
               </section>

               <div className={s.policy_updated}>
                  Last updated: October 2026
               </div>
            </div>
         </CustomModal>
         <CustomModal
            isOpen={aboutModal}
            onClose={() => setAboutModal(false)}
            title="About SkinVault"
            subTitle="A trusted marketplace for CS2 skins"
         >
            <div className={s.legal_content}>
               <section>
                  <h3>About SkinVault</h3>

                  <p>
                     SkinVault is a dedicated marketplace for Counter-Strike 2
                     skins, created to provide players with a reliable and
                     convenient platform for discovering, purchasing, and
                     selling in-game items.
                  </p>

                  <p>
                     Our marketplace brings together a wide range of weapons,
                     knives, gloves, and other CS2 items, allowing users to
                     browse available products, review pricing, and manage their
                     purchases in one place.
                  </p>
               </section>

               <section>
                  <h3>Our Mission</h3>

                  <p>
                     Our mission is to provide CS2 players with a marketplace
                     experience that is straightforward, secure, and accessible.
                     We aim to make purchasing and collecting skins convenient
                     while maintaining clear information about products,
                     pricing, orders, and transactions.
                  </p>
               </section>

               <section>
                  <h3>Our Marketplace</h3>

                  <p>
                     SkinVault is designed to support both new players and
                     experienced collectors. Whether you are purchasing your
                     first skin, upgrading your loadout, or searching for a
                     specific collectible, our platform provides access to a
                     broad selection of CS2 items.
                  </p>

                  <p>
                     We support secure payment options and aim to provide fast
                     delivery of purchased items, allowing users to complete
                     their transactions and receive their skins without
                     unnecessary delays.
                  </p>
               </section>

               <section>
                  <h3>Security & Trust</h3>

                  <p>
                     Trust is an important part of any marketplace. SkinVault is
                     designed with security in mind, including secure payment
                     processing and appropriate measures to protect account and
                     transaction information. We are committed to providing
                     users with a dependable environment for their CS2
                     marketplace activity.
                  </p>
               </section>

               <section>
                  <h3>Our Vision</h3>

                  <p>
                     Our vision is to build SkinVault into a trusted destination
                     for the CS2 community. We are focused on continuously
                     improving the marketplace, expanding the selection of
                     available items, and providing a consistent experience for
                     players and collectors.
                  </p>
               </section>

               <section>
                  <h3>Company</h3>

                  <p>
                     SkinVault is operated by BEMI PRIME LTD, registered at 128
                     City Road, London, EC1V 2NX. We are committed to developing
                     SkinVault as a reliable marketplace for players looking to
                     buy, sell, and collect CS2 skins.
                  </p>
               </section>

               <div className={s.policy_updated}>
                  SkinVault — Buy and sell CS2 skins instantly.
               </div>
            </div>
         </CustomModal>
         <p className={s.footer_p}>
            SkinVault is your trusted marketplace for buying and selling CS2
            skins. Explore a wide selection of weapons, knives, gloves, and
            other unique skins to find the perfect addition to your inventory.
            Whether you're looking for a rare collectible, upgrading your
            loadout, or simply searching for your next favorite skin, SkinVault
            makes it easy to discover and shop with confidence. As part of our
            commitment to providing a reliable marketplace experience, SkinVault
            is operated by BEMI PRIME LTD, registered at 128 City Road, London,
            EC1V 2NX. Start exploring today and take your CS2 collection to the
            next level. Built with a focus on a smooth and reliable marketplace
            experience, SkinVault is dedicated to making every step of your skin
            journey simple and convenient.
         </p>
         {/* ══ BOTTOM BAR ══ */}
         <div className={s.bottom_container}>
            <p className={s.copyright}>
               © 2026 SkinVault. Not affiliated with Valve Corporation.
            </p>
            <div className={s.stats}>
               {FooterStatsLinks.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                     <span className={s.stat}>
                        <span className={s.stat_val}>{stat.value}</span>
                        <span className={s.stat_label}>{stat.label}</span>
                     </span>
                     {i < FooterStatsLinks.length - 1 && (
                        <span className={s.dot}>·</span>
                     )}
                  </React.Fragment>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Footer;
