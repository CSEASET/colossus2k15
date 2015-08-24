<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Events | Colossus v5.0</title>
        <meta name="description" content="Development templates for MODX form MakeBeCool.com design studio" />
        <base  />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Events ver.2">

        <meta property="og:title" content="Events ver.2 / MODX Revolution" />
        <meta property="og:description" content="Development templates for MODX form MakeBeCool.com design studio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="events2.php" />
        <meta property="og:image" content="../assets/design/images/logo.php" />
        <meta property="og:site_name" content="MODX Revolution" />

        <meta http-equiv="x-dns-prefetch-control" content="on">
        <link rel="dns-prefetch" href="http://code.jquery.com/" />
        <link rel="dns-prefetch" href="http://fonts.googleapis.com/" />
        <link rel="dns-prefetch" href="http://www.google-analytics.com/" /> 

        <link rel="icon" href="./assets/themeclubcube-design/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="./assets/themeclubcube-design/images/favicon.ico" type="image/x-icon" />
        
        
        <link rel="stylesheet" href="./assets/themeclubcube-design/min/styles_1421224182.pack.css" type="text/css" />
		<script>
			var designUrl = '../assets/themeclubcube-design/index.php';
		</script>
        
        <!--[if lt IE 9]>
            <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
        <![endif]-->
        <!--[if IE]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

		
    </head>
    <body>
<div class="loader-container" id="loaderContainer">
	<div class="backstage"></div>
	<div class="loader" id="loader">
		<div class="fr-bl"></div>
		<div class="sc-bl"></div>
		<div class="thr-bl"></div>
		<div class="fth-bl"></div>
	</div>
</div>
<header id="header">
	<div class="container-fluid">
		<div class="row">
			<div class="navbar-header col-lg-2 col-lg-offset-1">
				<div class="tile">
					<button class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<span class="home-btn">Home</span>
				</div>
                
                    <a href="../index.php" class="navbar-brand first">
                        <img src="./assets/themeclubcube-design/images/logo-w.png" alt="MODX Revolution" class="site-logo">
                    </a>
                
			</div>
			<nav class="collapse navbar-collapse col-lg-8 main-navig" id="navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="index.php">Home</a>
                        </li>
						<li>
                            <a href="about.php">About Us</a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle main-heading-a"  data-toggle="dropdown">Teams<b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class="first"><a href="team.php?t=0" >Core</a></li>
                                <li><a href="team.php?t=1" >Website</a></li>
                                <li><a href="team.php?t=2" >Sponsorship</a></li>
                                <li><a href="team.php?t=3" >Event Management</a></li>
                                <li><a href="team.php?t=4" >Creative</a></li>
                                <li><a href="team.php?t=5" >Discipline</a></li>
                                <li><a href="team.php?t=6" >Publications</a></li>
                                <li><a href="team.php?t=7" >Hospitality</a></li>
                                <li><a href="team.php?t=8" >Logistics</a></li>
                                <li><a href="team.php?t=9" >Publicity</a></li>
                            </ul>
                        </li>
                        <li class="active dropdown">
                            <a href="#" class="dropdown-toggle main-heading-a"  data-toggle="dropdown">Events<b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class="first"><li><a href="events.php?day=1" >DAY 1</a></li>
                                <li><a href="events.php?day=2" >DAY 2</a></li>
                                <li><a href="events.php?day=online" >ONLINE EVENTS</a></li>
                            </ul>
                        </li>
						<li>
							<a href="sponsor.php">Sponsors</a>
						</li>
                        <li>
							<a href="gallery.php">Gallery</a>
						</li>
                        <li class="last"><a href="contacts.php" >Contact Us</a></li>
				</ul>
			</nav>
		</div>
	</div>
</header>
<main>
	<section class="all-events events-tiles">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-sm-6 events-tile-h1">
					<h1>Events</h1>
				</div>
			</div>
			<div class="rows">
				<div class="button-dropdown hidd">
					<div class="button-dropdown-text">
	<div class="dropdown-text-title">
		All events
		
		
		
	</div>
	<div class="dropdown-text-dates"></div>
</div>
<div class="button-dropdown-arr">
	<i></i>
</div>
<div class="hidden-dv hide" id="weeks-tab">
	<a href="events.php" class="tab-custom pressed">
		<div class="dropdown-text-title">All events</div>
		<div class="dropdown-text-dates">all upcoming events</div>
		<div class="tab-custom-line"></div>
	</a>
	<a href="events.php?day=1" class="tab-custom ">
	<div class="dropdown-text-title">
		Day 1
		
		
	</div>
	<div class="dropdown-text-dates">17th October | Saturday</div>
	<div class="tab-custom-line"></div>
    </a>
    <a href="events.php?day=2" class="tab-custom ">
	<div class="dropdown-text-title">
		
		Day 2
		
	</div>
	<div class="dropdown-text-dates">18th October | Sunday</div>
	<div class="tab-custom-line"></div>
</a>

    <a href="events.php?day=3" class="tab-custom ">
        <div class="dropdown-text-title">

            Online

        </div>
        <div class="dropdown-text-dates">10th-18th October</div>
        <div class="tab-custom-line"></div>
    </a>
    <!--a href="events2535d.php?startDate=2015-08-17&amp;endDate=2015-08-23" class="tab-custom " -->
		</div>
	</section>
	<div class="container gr-bg">
		<div class="rows events-tickets default-tickets">













            <?php

            include "../assets/php/connectionLocal.php";
            global $dbhandle;
            $day = (int)(isset($_REQUEST['day']) && strlen($_REQUEST['day']) == 1)? $_REQUEST['day']:5;


            $query  = "SELECT * FROM `events` WHERE `day` = \"$day\"";

            if($day == 5)
                $query  = "SELECT * FROM `events`;";

            $res = mysql_query($query, $dbhandle);

            while($row = mysql_fetch_row($res)) {
                //TODO

                $name = $row[1];
                $img = $row[4];
                $post = $row[3];
                $fb = $row[5];
                $mail = $row[6];
                $tel = $row[7];


                echo <<<HTML


            
<article class="ticket-event">
	<div class="ticket-event-date">
		<div class="date-event">
			<div class="month">Oct</div>
			<div class="day">17</div>
			<div class="week-day">Sat</div>
		</div>
		<div class="line-mg"></div>
		<div class="date-event last">
			<div class="month">start</div>
			<div class="day time-ev">
				09.00
			</div>
		</div>
		<div class="ticket-triangle-top"></div>
		<div class="ticket-triangle-bt"></div>
		<div class="rombs"></div>
	</div>
	<a href="#" title="Event_Pic" class="ticket-event-img img-contain">
        <img class="img-responsive img-preload" alt="Event_Pic" title="Event_Pic"
             data-src=">0:assets\uploads\events\matrix.png"
             data-src2x=">0:assets\uploads\events\matrix.png"
             src="assets\uploads\events\matrix.png" width="100%">
		<div class="ticket-triangle-top"></div>
		<div class="ticket-triangle-bt"></div>
		<div class="rombs"></div>
	</a>
	<div class="ticket-event-lineup">
		<h3><a href="#" title="Event_Name">Event 1</a></h3>
		<hr>
		<div class="ticket-line-cont">
			<div class="ticket-line-up sh" style="width: 344px">
				<div class="col-md-2 col-sm-2">About: </div>
				<div class="col-md-10 col-sm-10 uppercase">
					<p>
						<span class="brown-color">Coming Soon</span>
					</p>
				</div>
			</div>
			<div class="ticket-line-up hid">
				<div class="col-md-2 col-sm-2">Event Organiser Detail: </div>
				<div class="col-md-10 col-sm-10">
					<p class="ticket-text">Coming Soon</p>
				</div>
			</div>
		</div>
		<div class="ticket-triangle-top"></div>
		<div class="ticket-triangle-bt"></div>
		<div class="rombs"></div>
	</div>
	<div class="ticket-event-price">
		<div class="ticket-price uppercase"><span class="hidden-xs hidden-sm hidden-md">Rgstr<br></span><!--span class="ticket-doll uppercase">5$</span--></div>
		<div class="ticket-arrow-right"></div>
		<div class="ticket-triangle-top"></div>
		<div class="ticket-triangle-bt"></div>
		<div class="ticket-triangle-top last"></div>
		<div class="ticket-triangle-bt last"></div>
	</div>
</article>





HTML;


            }
            ?>









        </div>
	</div>
    
        
	
</main>
<footer class="contact-us">
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-6 col-sm-6 footer-block">
				
					<ul class="address-list">
						
							<li>
								<img src="./assets/themeclubcube-design/images/letter-img.png" alt="">
								<a href="mailto:colossus2k15@gmail.com">colossus2k15@gmail.com</a>
							</li>
							
							<li>
								<img src="./assets/themeclubcube-design/images/phone-angle.png" alt="">
								<ul>
									<li>(011) 2806 2106</li>
								</ul>
							</li>			
						
							<li>
								<img src="./assets/themeclubcube-design/images/baloone.png" alt="">
								<ul>
									<li>580 Najafgarh Kapashera Rd,Bijwasan New Delhi, DL 110061</li>
								</ul>
							</li>
						
					</ul>
				
			</div>
			<div class="col-lg-4 col-md-6 col-sm-6 footer-block">
                            
                            <div class="subscribe-here soc-marg">
				
					<div class="footer-header"></div>
				
                               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.261556358682!2d77.05886670000001!3d28.531856999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1bccf1811d45%3A0x8267fa0c91f75721!2sAmity+School+of+Engineering+%26+Technology!5e0!3m2!1sen!2sin!4v1439200004600" width="300" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
			    
			    </div>            
			</div>
			<div class="col-lg-4 col-md-12 col-sm-12 footer-block last">
				<div class="soc-marg soc-webs">
                    <div class="footer-header">Follow us</div>
					<p>To be up-to-date with us</p>
					<ul class="social-icons">
						
							<li><a href=""https://www.facebook.com/colossus.ieeeaset""> <i class="fa fa-facebook"></i></a></li>
							<li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div></li>
											
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>

<script>
	var global = {
		siteUrl: 'http://sites.makebecool.com/themeclubcube/',
		baseUrl: '/themeclubcube/',
		assetsUrl: '/themeclubcube/assets/',
		cultureKey: 'en'
	}
	var jsDeferred = {
			minJs: '/themeclubcube/assets/themeclubcube-design/min/scripts_1421224178.pack.js'
		}
	
</script>
<script type="text/javascript" src="./assets/themeclubcube-design/js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="./assets/components/molt/js/deferredfunctions.pack.js"></script>
</body>
</html>
