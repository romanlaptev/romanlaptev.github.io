<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- LANguard Network Security Scanner, generic XSL for reports -->
<!-- Copyright (c) 2001-2002 GFI Software Ltd. -->
<!-- Bogdan Calin -->

<xsl:variable name="show_table" select = "1"/>
<xsl:variable name="show_details" select = "1"/>
<xsl:variable name="details_icons" select = "1"/>
<xsl:variable name="show_images" select = "1"/>

<xsl:variable name="show_names" select = "1"/>
<xsl:variable name="show_domains" select = "1"/>
<xsl:variable name="show_shares" select = "1"/>
<xsl:variable name="show_groups" select = "1"/>
<xsl:variable name="show_users" select = "1"/>
<xsl:variable name="show_services" select = "1"/>
<xsl:variable name="show_transports" select = "1"/>
<xsl:variable name="show_drives" select = "1"/>
<xsl:variable name="show_uses" select = "1"/>
<xsl:variable name="show_processes" select = "1"/>
<xsl:variable name="show_tod" select = "1"/>
<xsl:variable name="show_policy" select = "1"/>
<xsl:variable name="show_registry" select = "1"/>
<xsl:variable name="show_hotfixes" select = "1"/>
<xsl:variable name="show_snmp" select = "1"/>
<xsl:variable name="show_tcp_ports" select = "1"/>
<xsl:variable name="show_udp_ports" select = "1"/>
<xsl:variable name="show_alerts" select = "1"/>

<xsl:template match="/">

  <body>
   <font face="Verdana, Arial, Helvetica, sans-serif" size="2">
   Scan target :
   <b><xsl:value-of select="hosts/@scan_target"/></b> [

   <b><xsl:value-of select="count(hosts/host)"/></b>
   computers found ]
   </font>
   <hr/>

   <xsl:if test="$show_table=1">

    <!--table begin-->
    <table border="0">
      <tr>
        <th align="middle" bgColor="#3366cc"><font color="#ffffff" size="2">IP Address</font></th>
       <xsl:if test="$details_icons = 1">
        <th align="middle" bgColor="#3366cc"><font color="#ffffff" size="2">Details</font></th>
       </xsl:if>
        <th align="middle" bgColor="#3366cc"><font color="#ffffff" size="2">Hostname</font></th>
        <th align="middle" bgColor="#3366cc"><font color="#ffffff" size="2">Username</font></th>
        <th align="middle" bgColor="#3366cc"><font color="#ffffff" size="2">Operating System</font></th>
      </tr>

      <!--each host-->
      <xsl:for-each select="hosts/host">

      <xsl:if test="1">
      <tr>
        <td bgColor="#f0f0f0"><a href="#{ip}"><xsl:value-of select="ip"/></a></td>

       <xsl:if test="$details_icons = 1">
        <td bgColor="#f0f0f0">

        <!--names-->
        <xsl:if test="count(names/name) > 0 and $show_names = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}names"><img src="images/names.bmp" border="0" alt="Netbios names"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}names">names</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--domains-->
        <xsl:if test="count(domains/domain) > 0 and $show_domains = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}domains"><img src="images/domain.bmp" border="0" alt="Domains"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}domains">domains</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--shares-->
        <xsl:if test="count(shares/share) > 0 and $show_shares = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}shares"><img src="images/share.bmp" border="0" alt="Shares"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}shares">shares</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--groups-->
        <xsl:if test="count(groups/group) > 0 and $show_groups = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}groups"><img src="images/group.bmp" border="0" alt="Groups"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}groups">groups</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--users-->
        <xsl:if test="count(users/user) > 0 and $show_users = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}users"><img src="images/user.bmp" border="0" alt="Users"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}users">users</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--service-->
        <xsl:if test="count(services/service) > 0 and $show_services = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}services"><img src="images/serv.bmp" border="0" alt="Services"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}services">services</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--transports-->
        <xsl:if test="count(transports/transport) > 0 and $show_transports = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}transports"><img src="images/transports.bmp" border="0" alt="Transports"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}transports">Network Devices</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--drives-->
        <xsl:if test="count(drives/drive) > 0 and $show_drives = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}drives"><img src="images/drive.bmp" border="0" alt="Drives"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}drives">drives</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--uses-->
        <xsl:if test="count(uses/use) > 0 and $show_uses = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}uses"><img src="images/netdrive.bmp" border="0" alt="Uses"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}uses">uses</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--processes-->
        <xsl:if test="count(processes/process) > 0 and $show_processes = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}processes"><img src="images/process.bmp" border="0" alt="Processes"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}processes">processes</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--tod-->
        <xsl:if test="tod/tod1 != '' and $show_tod = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}tod"><img src="images/clock.bmp" border="0" alt="Time of day"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}tod">tod</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--policy-->
        <xsl:if test="count(policy/pol) > 0 and $show_policy = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}policy"><img src="images/policy.bmp" border="0" alt="Security policies"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}policy">policy</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--registry-->
        <xsl:if test="count(registry/reg) > 0 and $show_registry = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}registry"><img src="images/reg.bmp" border="0" alt="Registry"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}registry">registry</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--hotfixes-->
        <xsl:if test="count(hotfixes/hotfix) > 0 and $show_hotfixes = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}hotfixes"><img src="images/hotfix.bmp" border="0" alt="Patches"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}hotfixes">hotfixes</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--snmp-->
        <xsl:if test="count(snmp_system/snmpentry) > 0 and $show_snmp = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}snmp"><img src="images/snmp.bmp" border="0" alt="SNMP"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}snmp">snmp</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--tcp-->
        <xsl:if test="count(ports/port) > 0 and $show_tcp_ports = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}tcp"><img src="images/udpports.bmp" border="0" alt="TCP ports"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}tcp">tcp</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--udp-->
        <xsl:if test="count(udp_ports/port) > 0 and $show_udp_ports = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}udp"><img src="images/ports.bmp" border="0" alt="UDP ports"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}udp">udp</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        <!--alerts-->
        <xsl:if test="count(alerts/*) > 0 and $show_alerts = 1">
         <xsl:if test="$show_images=1">
          <a href="#{ip}alerts"><img src="images/alerta2.bmp" border="0" alt="Alerts"/></a>
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
         </xsl:if>

         <xsl:if test="$show_images=0">
          <a href="#{ip}alerts">alerts</a>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>
        </xsl:if>

        </td>
       </xsl:if>

        <td bgColor="#f0f0f0"><xsl:value-of select="hostname"/></td>
        <td bgColor="#f0f0f0"><xsl:value-of select="username"/></td>
        <td bgColor="#f0f0f0">

         <xsl:if test="$show_images=1">
          <img src="{os_image_path}"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

        <xsl:value-of select="os"/>
        
        </td>
      </tr>
      </xsl:if>

      <!--end each host-->
      </xsl:for-each>

    </table>
    <!--table end-->
   </xsl:if>

      <!--start details-->
      <xsl:if test="$show_details=1">
      <br/>
      <xsl:for-each select="hosts/host">

      <!--conditia 1=true, 0=false -->
      <xsl:if test="1">

        <A name="{ip}"/>

        <table border="1" cellspacing="0" cellpadding="0"
        style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:0in 1.4pt 0in 1.4pt">
        <tr><td width="738" valign="top"
        style="width:7.10in;border:none windowtext .9pt;background:#3366cc;padding:0in 5.4pt 0in 4.4pt">

        <font color="white">

           <b><xsl:value-of select="ip"/>
           [ <xsl:value-of select="hostname"/> ]

           <font color="yellow">
           <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
           <xsl:value-of select="os"/>

        <!-- display service pack (if available) -->
        <xsl:choose>
         <xsl:when test = "servpack > 0">
          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          Service Pack <xsl:value-of select="servpack"/>
         </xsl:when>
         <xsl:otherwise>
         </xsl:otherwise>
        </xsl:choose>

        </font>
        </b>

        </font>

        </td></tr>

        <td>

        <!--start details-->
        <!--basic info-->

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        IP Address : <b><xsl:value-of select="ip"/></b><br/>
        <xsl:if test="hostname != ''">
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        Hostname : <b><xsl:value-of select="hostname"/></b><br/>
        </xsl:if>

        <xsl:if test="username != ''">
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         Username : <b><xsl:value-of select="username"/></b><br/>
        </xsl:if>

        <xsl:if test="mac != ''">
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         MAC address : <b><xsl:value-of select="mac"/></b>

         <xsl:if test="mac_vendor != ''">
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          Vendor : <font color="navy"><xsl:value-of select="mac_vendor"/></font>
         </xsl:if>

         <br/>
        </xsl:if>


        <xsl:if test="lanman != ''">
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         LAN Manager : <b><xsl:value-of select="lanman"/></b><br/>
        </xsl:if>

        <xsl:if test="domain != ''">
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         Domain : <b><xsl:value-of select="domain"/></b><br/>
        </xsl:if>

        <xsl:if test="resolved != ''">
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         Resolved : <b><xsl:value-of select="resolved"/></b><br/>
        </xsl:if>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        Operating System : <b><xsl:value-of select="os"/></b>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

        <xsl:choose>
         <xsl:when test = "servpack > 0">
          <b>Service Pack <xsl:value-of select="servpack"/></b><br/>
         </xsl:when>
         <xsl:otherwise>
           <br/>
         </xsl:otherwise>
        </xsl:choose>

        <xsl:if test="usage != ''">
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         Computer Usage : <b><xsl:value-of select="usage"/></b><br/>
        </xsl:if>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        Time to live : <b><xsl:value-of select="real_ttl"/></b><br/>

        <!--end basic info-->


        <!--names-->
        <xsl:if test="count(names/name) > 0 and $show_names = 1">

        <A name="{ip}names"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="names/name">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/names.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Browse list</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <b><xsl:value-of select="@serv"/></b> - <xsl:value-of select="@type"/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end names-->


        <!--domains-->
        <xsl:if test="count(domains/domain) > 0 and $show_domains = 1">
        <A name="{ip}domains"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="domains/domain">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/domain.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Trusted Domains</b><xsl:value-of select="concat(' - ', count(../../domains/domain), ' domains')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>
         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end domains-->

        <!--shares-->
        <xsl:if test="count(shares/share) > 0 and $show_shares = 1">
        <A name="{ip}shares"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="shares/share">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/share.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Shares</b><xsl:value-of select="concat(' - ', count(../../shares/share), ' shares')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <b><a href="\\{../../ip}\{@name}"><xsl:value-of select="@name"/></a></b> - <xsl:value-of select="@desc"/>

         <xsl:if test="@printer_share=1">
          <font color="darkgray">
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          <i>printer share</i>
          </font>
         </xsl:if>

         <xsl:if test="@passworded=1">
          <font color="darkgray">
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          <i>password is required</i>
          </font>
         </xsl:if>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end shares-->

        <!--groups-->
        <xsl:if test="count(groups/group) > 0 and $show_groups = 1">
        <A name="{ip}groups"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="groups/group">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/group.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Groups</b><xsl:value-of select="concat(' - ', count(../../groups/group), ' groups')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <b><xsl:value-of select="@name"/></b> -
         <xsl:value-of select="@desc"/>
         
         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end groups-->

        <!--users-->
        <xsl:if test="count(users/user) > 0 and $show_users = 1">
        <A name="{ip}users"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="users/user">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/User.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Users</b><xsl:value-of select="concat(' - ', count(../../users/user), ' users')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:if test="@enabled = 1">
          <font color="black">
           <b><xsl:value-of select="@name"/></b> (
           <xsl:value-of select="@desc"/> )
           

           <!-- user details -->
           <xsl:for-each select="userdetails">
             <br/>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:value-of select="."/>
           </xsl:for-each>

          </font>
         </xsl:if>

         <xsl:if test="@enabled = 0">
          <font color="gray">
           <b><xsl:value-of select="@name"/></b>
           
           <!-- user details -->
           <xsl:for-each select="userdetails">
             <br/>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
             <xsl:value-of select="."/>
           </xsl:for-each>
           
          </font>
         </xsl:if>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end users-->

        <!--services-->
        <xsl:if test="count(services/service) > 0 and $show_services = 1">
        <A name="{ip}services"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="services/service">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/serv.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Services</b><xsl:value-of select="concat(' - ', count(../../services/service), ' running services')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <b><xsl:value-of select="@name"/></b> -
         <xsl:value-of select="@desc"/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end services-->

        <!--transports-->
        <xsl:if test="count(transports/transport) > 0 and $show_transports = 1">
        <A name="{ip}transports"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="transports/transport">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/transports.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Network Devices</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end transports-->

        <!--drives-->
        <xsl:if test="count(drives/drive) > 0 and $show_drives = 1">
        <A name="{ip}drives"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="drives/drive">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/drive.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Drives</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end drive-->

        <!--uses-->
        <xsl:if test="count(uses/use) > 0 and $show_uses = 1">
        <A name="{ip}uses"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="uses/use">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/netdrive.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Connections</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end uses-->

        <!--processes-->
        <xsl:if test="count(processes/process) > 0 and $show_processes = 1">
        <A name="{ip}processes"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="processes/process">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/process.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Processes</b><xsl:value-of select="concat(' - ', count(../../processes/process), ' processes running')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:value-of select="."/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end process-->

        <!--tod-->
        <xsl:if test="tod/tod1 != '' and $show_tod = 1">
        <A name="{ip}tod"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

         <xsl:if test="$show_images=1">
          <img src="images/clock.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

        <font color="navy"><b>Remote TOD (time of day)</b><br/></font>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="tod/tod1"/><br/>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:value-of select="tod/tod2"/><br/>

        </td></tr></table>
        </xsl:if>
        <!--end tod-->


        <!--policy-->
        <xsl:if test="count(policy/pol) > 0 and $show_policy = 1">
        <A name="{ip}policy"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="policy/pol">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/policy.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Password policy</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end policy-->


        <!--security audit-->

        <xsl:if test="win=1 and $show_policy = 1">

        <A name="{ip}audit"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:if test="sec_audit=1">

         <xsl:if test="$show_images=1">
          <img src="images/policy.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Security audit policy</b></font>
         <font color="black"><b>  - Auditing is enabled</b><br/><br/></font>
         <font color="navy"><b>Events audited</b><br/></font>

        <xsl:for-each select="sec_audit_events/event">

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="@name"/>

         <br/>

        </xsl:for-each>

        </xsl:if>

        <xsl:if test="sec_audit=0">

         <xsl:if test="$show_images=1">
          <img src="images/policy.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Security audit policy</b></font>
         <font color="red"><b>  - Auditing is disabled</b><br/></font>
         <font color="black">It is recommended to enable auditing in order to track security related events !<br/></font>

        </xsl:if>

        </td></tr></table>
        </xsl:if>
        <!--security audit-->



        <!--registry-->
        <xsl:if test="count(registry/reg) > 0 and $show_registry = 1">
        <A name="{ip}registry"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="registry/reg">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/reg.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Registry</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <b><xsl:value-of select="@name"/></b> -
         <xsl:value-of select="@desc"/>

         <br/>

        </xsl:for-each>
        </td></tr></table>
        </xsl:if>
        <!--end registry-->


        <!--registry run-->
        <xsl:if test="count(regrun/runentry) > 0 and $show_registry = 1">

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="regrun/runentry">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/reg.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Registry Run</b><br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>

         <br/>

        </xsl:for-each>

        </td></tr></table>
        </xsl:if>
        <!--end registry run-->



        <!--hotfixes-->
        <xsl:if test="count(hotfixes/hotfix) > 0 and $show_hotfixes = 1">
        <A name="{ip}hotfixes"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="hotfixes/hotfix">
        <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/hotfix.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

         <font color="navy"><b>Installed patches</b><xsl:value-of select="concat(' - ', count(../../hotfixes/hotfix), ' patches')"/>
         <br/></font>
        </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>
         <br/>

        </xsl:for-each>

         </td></tr></table>
        </xsl:if>
        <!--end hotfixes-->


        <!--snmp-->
        <xsl:if test="count(snmp_system/snmpentry) > 0 and $show_snmp = 1">
        <A name="{ip}snmp"/>

         <br/>
         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="200" valign="top"
         style="width: 6.95in ;border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

        <xsl:for-each select="snmp_system/snmpentry">
         <xsl:if test="position()=1">

         <xsl:if test="$show_images=1">
          <img src="images/snmp.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>


         <font color="navy"><b>SNMP info (system)</b><br/></font>
         </xsl:if>

         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <b><xsl:value-of select="@name"/></b> -
         <xsl:value-of select="@desc"/>

         <br/>

         </xsl:for-each>

         </td></tr></table>
        </xsl:if>
        <!--end snmp-->

        <!--TCP ports-->
        <xsl:if test="count(ports/port) > 0 and $show_tcp_ports = 1">
        <A name="{ip}tcp"/>

        <xsl:for-each select="ports/port">

        <xsl:if test="position()=1">
        <br/>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:if test="$show_images=1">
          <img src="images/udpports.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

        <font color="navy"><b>TCP ports</b><xsl:value-of select="concat(' - ', count(../../ports/port), ' open ports')"/>
        <br/></font>
        </xsl:if>

         <b>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="@name"/>
         </b> [
         <xsl:value-of select="@desc"/> ]
         <br/>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="68"></td><td width="200" valign="top"
         style="width:6.25in; border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">

             <xsl:for-each select="line">
              <xsl:value-of select="."/><br/>
             </xsl:for-each>

          </td></tr></table>
        </xsl:for-each>
        </xsl:if>
        <!--end ports-->


        <!--udp ports-->
        <xsl:if test="count(udp_ports/port) > 0 and $show_udp_ports = 1">
        <A name="{ip}udp"/>

        <xsl:for-each select="udp_ports/port">

        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:if test="$show_images=1">
          <img src="images/ports.bmp"/>
          <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         </xsl:if>

        <font color="navy"><b>UDP ports</b><xsl:value-of select="concat(' - ', count(../../udp_ports/port), ' open ports')"/>
        <br/></font>
        </xsl:if>

         <b>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="@name"/>
         </b> [
         <xsl:value-of select="@desc"/> ]


         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="68"></td><td width="200" valign="top"
         style="width: 6.25in; border:none windowtext .9pt;background:#f5f5f5;padding:0in 5.4pt 0in 4.4pt">
         </td></tr></table>


        </xsl:for-each>
        </xsl:if>
        <!--end udp ports-->

        <!--alerts titlu-->
        <xsl:if test="$show_alerts = 1">
        <xsl:if test="count(alerts/*) > 0">
        <A name="{ip}alerts"/>
        <xsl:for-each select="alerts">
        <br/>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Alerts</b></font>


        <!--Missing hotfixes-->
        <xsl:for-each select="missing_hotfixes/product">
        <xsl:if test="position()=1">
        <br/>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/missing_hotfix.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Missing patches</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td>

         <td width="200" valign="top"
         style="width: 6.70in ;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

         <font color = "white">
         <b>
         <xsl:value-of select="@name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">

         <!--latestSPavailable-->
         <xsl:if test="@latestSPavailable != ''">
          <b>The latest service pack for this product is not installed !</b><br/>
          Latest SP available : <xsl:value-of select="@latestSPavailable"/><br/>
          <a href="{@latestSPurl}"><xsl:value-of select="@latestSPurl"/></a><br/><br/>
         </xsl:if>
         <!--latestSPavailable-->


         <!--hotfix-->
         <xsl:for-each select="hotfix">
          <b><xsl:value-of select="name"/></b> - <xsl:value-of select="qname"/><br/>
          <font color="navy"><xsl:value-of select="desc"/><br/></font>
          <font color="gray"><xsl:value-of select="reason"/></font><br/>
          <a href="{url}"><xsl:value-of select="url"/></a><br/><br/>
         </xsl:for-each>
         <!--hotfix-->



         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end missing hotfixes-->


        <!--backdoors-->
        <xsl:for-each select="backdoors/backdoor">
        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <font color="navy"><b>Backdoors</b><br/></font>
        </xsl:if>

         <b>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
         <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

         <xsl:value-of select="."/>
         </b><br/>

        </xsl:for-each>
        <!--end backdoors-->


        <!--CGI abuses-->
        <xsl:for-each select="cgi_abuses/cgi_abuse">
        <xsl:if test="position()=1">
        <br/>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>CGI abuses</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td>

         <td width="200" valign="top"
         style="width: 6.70in ;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width:4.90in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="impact"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end CGI abuses-->



        <!--FTP alerts-->
        <xsl:for-each select="FTP_Alerts/FTP_Alert">
        <xsl:if test="position()=1">
        <br/>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>FTP alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td>

         <td width="200" valign="top"
         style="width: 6.70in ;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width:4.90in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end FTP alerts-->

        <!--DNS alerts-->
        <xsl:for-each select="DNS_Alerts/DNS_Alert">
        <xsl:if test="position()=1">
        <br/>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>DNS alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td>

         <td width="200" valign="top"
         style="width: 6.70in ;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width:4.90in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end DNS alerts-->

        <!--mail alerts-->
        <xsl:for-each select="Mail_Alerts/Mail_Alert">
        <xsl:if test="position()=1">
        <br/>

        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Mail alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td>

         <td width="200" valign="top"
         style="width: 6.70in ;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width:4.90in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end mail alerts-->


        <!--service alerts-->
        <xsl:for-each select="Service_Alerts/Service_Alert">
        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Service alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td><td width="200" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>


         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end service alerts-->


        <!--RPC alerts-->
        <xsl:for-each select="RPC_Alerts/RPC_Alert">
        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>RPC alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td><td width="200" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>


         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end RPC alerts-->

        <!--Registry alerts-->
        <xsl:for-each select="Registry_Alerts/Registry_Alert">
        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Registry alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td><td width="200" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end Registry alerts-->

        <!--Misc alerts-->
        <xsl:for-each select="Misc_Alerts/Misc_Alert">
        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Miscellaneous alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td><td width="200" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end Misc alerts-->

        <!--Info alerts-->
        <xsl:for-each select="Info_Alerts/Info_Alert">
        <xsl:if test="position()=1">
        <br/>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>

          <xsl:if test="$show_images=1">
           <img src="images/dir.bmp"/>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color="navy"><b>Informational alerts</b><br/></font>
        </xsl:if>

         <table border="0" cellspacing="0" cellpadding="0"
         style="border-collapse:collapse; mso-border-alt:solid windowtext .9pt;mso-padding-alt:3in 1.4pt 0in 1.4pt">
         <tr><td width="20"></td><td width="200" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#6f6f6f;padding:0in 5.4pt 0in 4.4pt">

          <xsl:if test="$show_images=1">
           <xsl:choose>
            <xsl:when test="level = 0">
             <img src="images/high.bmp"/>
            </xsl:when>
            <xsl:when test="level = 1">
             <img src="images/med.bmp"/>
            </xsl:when>
            <xsl:when test="level = 2">
             <img src="images/low.bmp"/>
            </xsl:when>
            <xsl:otherwise>
             <img src="images/information.bmp"/>
            </xsl:otherwise>
           </xsl:choose>
           <xsl:text disable-output-escaping="yes"> &amp;nbsp;</xsl:text>
          </xsl:if>

         <font color = "white">
         <b>
         <xsl:value-of select="name"/><br/>
         </b>
         </font>
         </td>
         </tr>


         <tr><td></td>
         <td width="738" valign="top"
         style="width: 6.70in;border:none windowtext .9pt;background:#f5f5f5; padding:0in 5.4pt 0in 4.4pt">


         <xsl:value-of select="descr"/><br/>

         <a href="{bugtraq}"><xsl:value-of select="bugtraq"/></a><br/>

         </td>
         </tr>
         </table>

         <br/>

        </xsl:for-each>
        <!--end Info alerts-->


        </xsl:for-each>
        </xsl:if>
        </xsl:if>
        <!--end alerts-->


        <!--end computer details-->
        </td>
        </table>

      <br/>
      </xsl:if>

      <!--end each details-->
      </xsl:for-each>
      </xsl:if>

   <xsl:element name="HR"/>
   <font face="Verdana, Arial, Helvetica, sans-serif" size="2"><xsl:value-of select="hosts/@created_on"/></font><br/>
  </body>
</xsl:template>
</xsl:stylesheet>

