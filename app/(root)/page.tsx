import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn = {firstName : 'Rony', lastName : 'Mawla', email:'mawla@gmail.com'};
    return (
        <section className="home">
          <div className="home-content">
            <header className="home-header">
              <HeaderBox 
                type="greeting"
                title="Welcome"
                subtext="Access and manage your account and transactions efficiently"
                user={loggedIn?.firstName || 'Guest'}
              />

              <TotalBalanceBox 
                accounts = {[]}
                totalBanks = {1}
                totalCurrentBalance = {1250.35}
              />
            </header>

            RECENT TRANSACTIONS
          </div>

          <RightSidebar
          user={loggedIn}
          transactions={[]}
          banks={[]}
          />
        </section>
      );
}

export default Home
