<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> my bookmarks </title>
<head>
<script>
//alert ("Hello!");

function processnode(nnodeid)
{

//alert (nnodeid);

 if (document.getElementById(nnodeid).style.display == "none")
   {
    document.getElementById(nnodeid).style.display = ""
   }
 else
   {
    document.getElementById(nnodeid).style.display = "none"
   }
}

</script>
</head>
<body>
<h1> my bookmarks   </h1>
<table border="0" width="85%" cellpadding="1" cellspacing="1">

<!--
<xsl:value-of select="bookmarks/section/li[1]" /><br/>
<xsl:value-of select="bookmarks/section/li/a/@href" /><br/>

<xsl:value-of select="bookmarks/section[2]/li[1]" /><br/>
<xsl:value-of select="bookmarks/section[2]/li[1]/a/@href" /><br/>
<xsl:value-of select="bookmarks/section[2]/li[3]" /><br/>
<xsl:value-of select="bookmarks/section[2]/li[3]/a/@href" /><br/>

<hr/>
<xsl:value-of select="bookmarks/section[1]" /><br/>
<hr/>
<xsl:value-of select="bookmarks/section[2]" /><br/>

<xsl:value-of select="count (bookmarks/section[1]/li/a)" /><br/>
-->


<xsl:for-each select="bookmarks/section">
<tr>
<td width="5%"></td>
<!--
<td  width="10%" valign="top"><b>[<xsl:value-of select="name(.)"/>_<xsl:number/>]</b></td>
-->
<td  width="3%" align="right" valign="top">
<a href='javascript:processnode("section_{position()}")'><xsl:value-of select="@title"/></a>
</td>

<td>

<div style='display: none; background-color: white; border-style:solid; border-color: white;  padding:4mm;' id='section_{position()}'>
	<xsl:for-each select="child::*">
		<xsl:choose>

		<xsl:when test="name(.)='a'">
                       <a href="{./@href}" target="{./@target}"><xsl:value-of select="."/></a><br/>
		</xsl:when>
		</xsl:choose>

		<xsl:if test="name(.)='p'"><p><xsl:value-of select="." /></p></xsl:if>
		<xsl:if test="name(.)='comment'"><p><![CDATA[<xsl:value-of select="." />]]></p></xsl:if>
		<xsl:if test="name(.)='pre'"><pre><xsl:value-of select="." /></pre></xsl:if>
		<xsl:if test="name(.)='h1'"><h1><xsl:value-of select="." /></h1></xsl:if>
		<xsl:if test="name(.)='h2'"><h2><xsl:value-of select="." /></h2></xsl:if>
		<xsl:if test="name(.)='h3'"><h3><xsl:value-of select="." /></h3></xsl:if>
		<xsl:if test="name(.)='h4'"><h4><xsl:value-of select="." /></h4></xsl:if>
		<xsl:if test="name(.)='hr'">	<hr/>  </xsl:if>

	</xsl:for-each>

</div>
</td>
</tr>
</xsl:for-each>


<!--
<xsl:for-each select="bookmarks/section">
<p>
<xsl:number/><b>[<xsl:value-of select="name(.)"/>]
<a href='javascript:processnode("section_{position()}")'>
<xsl:value-of select="@title"/></a></b>
</p>

<div style='display: visible; background-color: white;' id='section_{position()}'>

<xsl:for-each select="li">
    <xsl:for-each select="a">
           <li><a href="{@href}"><xsl:value-of select="."/></a></li>
    </xsl:for-each>
</xsl:for-each>

<xsl:for-each select="p">
           <pre><xsl:value-of select="."/></pre>
</xsl:for-each>

</div>
</xsl:for-each>
-->

</table>

</body>
</html>
</xsl:template>

</xsl:stylesheet>
