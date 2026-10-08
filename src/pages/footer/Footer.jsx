import React, { useState } from "react";
import s from "./Footer.module.css";
import {
   FooterQuickLinks,
   FooterLegalLinks,
   FooterStatsLinks,
   FooterCategories,
} from "../../utils/constants/Constants";
import CustomModal from "../../components/CustomModal/CustomModal";

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
               <a href="/" className={s.logo}>
                  <div className={s.logo_icon}>
                     <span className={s.logo_pulse}></span>
                  </div>
                  <span className={s.logo_text}>
                     SKIN<span className={s.logo_accent}>VAULT</span>
                  </span>
               </a>
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
                           <a href={link.href}>{link.label}</a>
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
                        <a href={`/store${cat.href}`}>{cat.value}</a>
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
                           <a href={link.href}>{link.label}</a>
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
                  <h3>Need help with SkinVault?</h3>

                  <p>
                     If you have any questions or need assistance with your
                     account, orders, payments, or skins, feel free to reach out
                     to our support team.
                  </p>
               </div>

               <div className={s.support_email}>
                  <span className={s.support_label}>Email</span>

                  <a
                     href="mailto:support@skinvault.com"
                     className={s.support_email_link}
                  >
                     support@skinvault.com
                  </a>
               </div>

               <p className={s.support_response}>
                  We'll do our best to get back to you within 24–48 hours.
               </p>

               <div className={s.support_contact}>
                  <h3>Contact Support</h3>

                  <p>
                     For faster assistance, please include your order ID and a
                     brief description of your issue when contacting us.
                  </p>
               </div>

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
            subTitle="The rules and conditions for using SkinVault"
         >
            <div className={s.legal_content}>
               <section>
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                     By creating an account or using SkinVault, you agree to
                     these Terms of Service. If you do not agree with these
                     terms, you should not use the SkinVault platform.
                  </p>
               </section>

               <section>
                  <h3>2. About SkinVault</h3>
                  <p>
                     SkinVault is an online marketplace designed to facilitate
                     the buying and selling of Counter-Strike 2 (CS2) skins and
                     related virtual items. SkinVault is not affiliated with,
                     endorsed by, or sponsored by Valve Corporation or Steam.
                  </p>
               </section>

               <section>
                  <h3>3. User Accounts</h3>
                  <p>
                     You are responsible for maintaining the security of your
                     SkinVault account and for all activity performed through
                     your account. You agree to provide accurate information and
                     must not create an account for fraudulent or unlawful
                     purposes.
                  </p>
               </section>

               <section>
                  <h3>4. Buying and Selling Skins</h3>
                  <p>
                     Users may use SkinVault to purchase or sell supported CS2
                     skins and virtual items. Prices may change based on market
                     conditions, item availability, and other factors.
                  </p>
                  <p>
                     A transaction may be subject to verification before it is
                     considered complete. SkinVault reserves the right to cancel
                     or reject a transaction when necessary to protect users or
                     the platform.
                  </p>
               </section>

               <section>
                  <h3>5. Virtual Items</h3>
                  <p>
                     CS2 skins and other supported virtual items do not
                     represent physical goods and do not grant ownership of the
                     underlying CS2 game, software, or intellectual property.
                  </p>
               </section>

               <section>
                  <h3>6. Payments</h3>
                  <p>
                     Payments may be processed through third-party payment
                     providers. Additional terms or fees imposed by those
                     providers may apply.
                  </p>
                  <p>
                     You agree not to use stolen payment methods, unauthorized
                     accounts, fraudulent transactions, or any other payment
                     method obtained unlawfully.
                  </p>
               </section>

               <section>
                  <h3>7. Prohibited Activities</h3>
                  <p>
                     You may not use SkinVault to engage in fraud, money
                     laundering, unauthorized access, abuse of other users,
                     manipulation of transactions, exploitation of technical
                     vulnerabilities, or any other unlawful activity.
                  </p>
               </section>

               <section>
                  <h3>8. Market Prices</h3>
                  <p>
                     Skin prices displayed on SkinVault may change at any time.
                     We do not guarantee that displayed prices will remain
                     accurate or available after you begin or complete a
                     transaction.
                  </p>
               </section>

               <section>
                  <h3>9. Transactions and Refunds</h3>
                  <p>
                     Completed transactions may not always be reversible.
                     Refunds, cancellations, or transaction disputes may be
                     subject to the circumstances of the transaction and any
                     applicable payment provider policies.
                  </p>
               </section>

               <section>
                  <h3>10. Steam and Third-Party Services</h3>
                  <p>
                     SkinVault may interact with Steam or other third-party
                     services. Your use of those services remains subject to
                     their respective terms, policies, and rules.
                  </p>
                  <p>
                     SkinVault is not responsible for outages, restrictions,
                     account limitations, trade holds, API changes, or other
                     issues caused by third-party services.
                  </p>
               </section>

               <section>
                  <h3>11. Account Suspension</h3>
                  <p>
                     SkinVault may suspend or terminate an account when we
                     reasonably believe that the account has violated these
                     Terms of Service, participated in fraudulent activity, or
                     created a risk to other users or the platform.
                  </p>
               </section>

               <section>
                  <h3>12. Platform Availability</h3>
                  <p>
                     We aim to keep SkinVault available and functioning
                     properly, but we do not guarantee uninterrupted or
                     error-free access to the platform. Maintenance, technical
                     problems, security incidents, or third-party outages may
                     temporarily affect availability.
                  </p>
               </section>

               <section>
                  <h3>13. Intellectual Property</h3>
                  <p>
                     SkinVault's branding, website design, software, text,
                     graphics, and other original content are protected by
                     applicable intellectual property laws. You may not copy,
                     reproduce, modify, or redistribute SkinVault content
                     without appropriate authorization.
                  </p>
               </section>

               <section>
                  <h3>14. Limitation of Liability</h3>
                  <p>
                     To the extent permitted by applicable law, SkinVault is not
                     responsible for losses resulting from third-party services,
                     unauthorized access, market price changes, service
                     interruptions, or events outside our reasonable control.
                  </p>
               </section>

               <section>
                  <h3>15. Changes to These Terms</h3>
                  <p>
                     We may update these Terms of Service from time to time.
                     Updated terms will become effective when published on the
                     SkinVault platform. Continued use of SkinVault after an
                     update means you acknowledge the updated terms.
                  </p>
               </section>

               <section>
                  <h3>16. Contact</h3>
                  <p>
                     If you have questions about these Terms of Service, please
                     contact the SkinVault support team.
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
            subTitle="A better way to buy and sell CS2 skins"
         >
            <div className={s.legal_content}>
               <section>
                  <h3>Welcome to SkinVault</h3>

                  <p>
                     SkinVault is a marketplace built for Counter-Strike 2
                     players who want a simple, transparent, and modern way to
                     discover, buy, and sell skins.
                  </p>

                  <p>
                     We believe trading and collecting skins shouldn't feel
                     complicated. That's why SkinVault is designed around a
                     straightforward experience where you can explore items,
                     compare prices, and manage your collection with ease.
                  </p>
               </section>

               <section>
                  <h3>Our Mission</h3>

                  <p>
                     Our mission is to make the CS2 skin marketplace easier to
                     understand and more enjoyable for everyone—from players
                     buying their first skin to collectors searching for their
                     next favorite item.
                  </p>
               </section>

               <section>
                  <h3>Built for the Community</h3>

                  <p>
                     CS2 skins are more than just digital items. They are part
                     of the identity, style, and culture of the Counter-Strike
                     community.
                  </p>

                  <p>
                     SkinVault aims to create a marketplace where players can
                     discover items they actually want while having access to
                     clear information about pricing and availability.
                  </p>
               </section>

               <section>
                  <h3>Simple. Transparent. Fast.</h3>

                  <p>
                     We focus on keeping the SkinVault experience clean and easy
                     to use. No unnecessary complexity—just a marketplace built
                     around the items you're looking for.
                  </p>

                  <p>
                     From browsing categories to checking your orders, every
                     part of the platform is designed with simplicity in mind.
                  </p>
               </section>

               <section>
                  <h3>Why SkinVault?</h3>

                  <p>
                     We created SkinVault with a simple idea: buying and selling
                     CS2 skins should feel as smooth as using any modern
                     marketplace.
                  </p>

                  <p>
                     Our platform brings skins, pricing, orders, and your
                     collection together in one place so you can spend less time
                     dealing with the marketplace and more time enjoying the
                     game.
                  </p>
               </section>

               <section>
                  <h3>Our Vision</h3>

                  <p>
                     We're building SkinVault with the goal of becoming a
                     trusted destination for CS2 skin enthusiasts—a place where
                     players can discover new items, build collections, and
                     participate in the marketplace with confidence.
                  </p>
               </section>

               <section>
                  <h3>Built for CS2 Players</h3>

                  <p>
                     Whether you're looking for your next AK-47, hunting for the
                     perfect pair of gloves, or simply browsing what's
                     available, SkinVault is built to make that experience
                     better.
                  </p>
               </section>

               <div className={s.policy_updated}>
                  SkinVault — Buy and sell CS2 skins instantly.
               </div>
            </div>
         </CustomModal>

         <p className={s.footer_p}>
            SkinVault is your trusted marketplace for buying and selling CS2 skins. Explore a wide selection of weapons, knives, gloves, and other unique skins to find the perfect addition to your inventory. Whether you're looking for a rare collectible, upgrading your loadout, or simply searching for your next favorite skin, SkinVault makes it easy to discover and shop with confidence. Start exploring today and take your CS2 collection to the next level.

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
