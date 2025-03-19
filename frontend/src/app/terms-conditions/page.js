'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

const TermsAndConditions = () => {
    return (
        <div className="flex justify-center mt-20 px-5 md:px-20 font-aleo">
            <Navbar />
            <div className="max-w-4xl w-full rounded-lg">
                <h1 className="md:text-3xl text-2xl max-[400px]:text-xl font-bold text-center md:mb-10 mb-6 drop-shadow-[1px_1px_1px_red]">Terms and Conditions</h1>

                <p className="italic text-lg mb-4">Welcome to <span className="font-semibold font-alex drop-shadow-[1px_1px_1px_yellow]">Lyaim</span>. By using our services, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully before participating in any fantasy contests or using the website.</p>

                <section className="mb-6">
                    <h2 className="text-xl max-[400px]:text-lg font-bold mb-2">1. Eligibility</h2>
                    <p>To use the website, you must be at least <span className="font-semibold">18</span> years old and comply with the local laws governing online gaming in your jurisdiction. Users found to be underage will have their accounts terminated.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">2. Fantasy Scoring System</h2>
                    <p>The website uses a point-based system for scoring player performances in fantasy contests. Below is the breakdown of points for different player actions:</p>
                    <h3 className="text-lg font-semibold mt-3 max-[400px]:text-md">Offensive Players:</h3>
                    <ul className="list-disc pl-5">
                        <li>Passing: 2 points per 25 yards, 6 points for a touchdown</li>
                        <li>Rushing: 3 points per 10 yards, 8 points for a touchdown</li>
                        <li>Receiving: 2 points per 10 yards, 8 points for a touchdown</li>
                        <li>2-Point Conversions: 2 points</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-3 max-[400px]:text-sm">Team Defense and Special Teams:</h3>
                    <ul className="list-disc pl-5">
                        <li>Sacks: 2 points</li>
                        <li>Interceptions: 4 points</li>
                        <li>Fumbles Recovered: 4 points</li>
                        <li>Safeties: 4 points</li>
                        <li>Defensive Touchdowns: 12 points</li>
                        <li>Kick and Punt Return Touchdowns: 12 points</li>
                        <li>2-Point Conversion Returns: 4 points</li>
                        <li>Points Allowed (0): 10 points</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-3 max-[400px]:text-sm">Kickers:</h3>
                    <ul className="list-disc pl-5">
                        <li>50+ Yard FG Made: 7 points.</li>
                        <li>40-49 Yard FG Made: 6 points.</li>
                        <li>39 Yards or Less FG Made: 5 points.</li>
                        <li>Extra Point Made: 3 points.</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-3 max-[400px]:text-sm ">Penalty Points:</h3>
                    <ul className="list-disc pl-5">
                        <li>Missed FG (0-39 Yards): -3 points.</li>
                        <li>Missed FG (40-49 Yards): -2 points.</li>
                        <li>Intercepted Pass: -3 points.</li>
                        <li>Fumble Lost: -3 points.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">3. Substitute Player Rules</h2>
                    <li className='font-bold text-lg mt-4'>Substitute Players:</li>
                    <p>Each team may select up to 2 substitute players, who will only come into play if one or two of your starting 11 players underperform, based on the points they have earned. The substitute players will automatically replace the underperforming players with higher-performing substitutes.</p>

                    <li className='font-bold text-lg mt-4'>Substitution Criteria:</li>
                    <p>If any player scores fewer points than the substitute, the substitute player with the higher points will be substituted in. Substitutions will happen automatically, and the system will calculate the best possible lineup to maximize your score.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">4. Contest Entry and Participation</h2>
                    <p>Each contest may require an entry fee. The entry fee will be clearly displayed before you confirm participation. Users are allowed to join a contest only once until it is full.
                        Once a contest is full, no further entries will be accepted. The contest will specify the rules, prize pool, and participation limits.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">5. Prize Pool and Payouts</h2>
                    <p>Prizes for each contest will be announced before the start of the contest. The prize pool will be divided according to the contest rules and will depend on the number of participants and the performance of the fantasy teams. Prize distribution will occur after the contest ends, and the winnings will be credited to the user's account on the website.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">6. User Conduct and Account Management</h2>
                    <p>You are responsible for maintaining the confidentiality of your account and login credentials. You must notify the website immediately if you suspect any unauthorized use of your account.
                        Users are prohibited from engaging in any illegal or fraudulent activities on the website. Any violation of the rules may result in suspension or termination of your account.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">7. Withdrawals and Deposits</h2>
                    <p>Users must deposit funds into their account to participate in contests. Payment methods and deposit limits will be clearly outlined on the website.
                        Users can withdraw their winnings after meeting the applicable requirements. Withdrawals will be processed in accordance with the website's withdrawal policy. Processing times may vary.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">8. Amendments and Updates</h2>
                    <p>The website reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Users will be notified of any major changes through the website, and continued use of the website after changes indicates acceptance of the updated terms.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">9. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Lyain will not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of the website, including but not limited to any errors or failures in the system, issues with contests, or disputes between users.
                        The website does not guarantee the availability or operation of its services at all times.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">10. Governing Law</h2>
                    <p>These Terms and Conditions are governed by and construed in accordance with the laws of the United States of America (USA), without regard to its conflict of law principles. Any disputes related to these terms will be resolved in the appropriate courts of the USA.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-2 max-[400px]:text-lg">Contact Information</h2>
                    <p>If you have any questions or concerns, feel free to contact us via email at <span className="text-blue-600">support</span>.</p>
                </section>

                <p className="text-center text-gray-500">&copy; 2024 Lyaim</p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
